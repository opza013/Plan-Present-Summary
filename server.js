import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(os.tmpdir(), 'range-operation-platform'));
const DB_FILE = path.join(DATA_DIR, 'range-operation.db');
const MAX_BODY = 12 * 1024 * 1024;
const TOKENS = {
  admin: process.env.RANGE_ADMIN_TOKEN || '',
  editor: process.env.RANGE_EDITOR_TOKEN || process.env.RANGE_APP_TOKEN || '',
  viewer: process.env.RANGE_VIEW_TOKEN || ''
};
const STATIC_FILES = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/seed-data.js', ['seed-data.js', 'application/javascript; charset=utf-8']],
  ['/app.js', ['app.js', 'application/javascript; charset=utf-8']]
]);

fs.mkdirSync(DATA_DIR, { recursive: true });
const db = new DatabaseSync(DB_FILE);
db.exec(`
  PRAGMA journal_mode=WAL;
  PRAGMA synchronous=NORMAL;
  CREATE TABLE IF NOT EXISTS state_store (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    revision INTEGER NOT NULL DEFAULT 0,
    payload TEXT,
    updated_at TEXT,
    updated_by TEXT
  );
  INSERT OR IGNORE INTO state_store(id, revision, payload) VALUES (1, 0, NULL);
  CREATE TABLE IF NOT EXISTS history (
    revision INTEGER PRIMARY KEY,
    payload TEXT NOT NULL,
    updated_at TEXT,
    updated_by TEXT,
    action TEXT
  );
  CREATE TABLE IF NOT EXISTS audit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    revision INTEGER NOT NULL,
    at TEXT NOT NULL,
    user TEXT,
    action TEXT
  );
`);

function sendJson(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'no-referrer'
  });
  res.end(JSON.stringify(data));
}
function sendFile(res, file, type) {
  try {
    const body = fs.readFileSync(path.join(ROOT, file));
    res.writeHead(200, {
      'Content-Type': type,
      'Cache-Control': file === 'index.html' ? 'no-cache' : 'public, max-age=300',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN'
    });
    res.end(body);
  } catch {
    res.writeHead(404); res.end('Not found');
  }
}
async function readBody(req) {
  return await new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', chunk => {
      size += chunk.length;
      if (size > MAX_BODY) { reject(Object.assign(new Error('Payload too large'), { status: 413 })); req.destroy(); return; }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}
function tokenRole(token) {
  const configured = Object.values(TOKENS).some(Boolean);
  if (!configured) return 'admin';
  if (TOKENS.admin && token === TOKENS.admin) return 'admin';
  if (TOKENS.editor && token === TOKENS.editor) return 'editor';
  if (TOKENS.viewer && token === TOKENS.viewer) return 'viewer';
  return 'none';
}
function roleRank(role) { return { none: 0, viewer: 1, editor: 2, admin: 3 }[role] || 0; }
function auth(req, required = 'viewer') {
  const raw = String(req.headers.authorization || '');
  const token = raw.startsWith('Bearer ') ? raw.slice(7) : String(req.headers['x-range-token'] || '');
  const role = tokenRole(token);
  return { ok: roleRank(role) >= roleRank(required), role };
}
function requireRole(req, res, required) {
  const a = auth(req, required);
  if (!a.ok) { sendJson(res, 401, { ok: false, error: 'Authentication required', requiredRole: required, role: a.role }); return null; }
  return a;
}
function currentRow() { return db.prepare('SELECT revision, payload, updated_at, updated_by FROM state_store WHERE id=1').get(); }
function currentState() { const row = currentRow(); return row.payload ? JSON.parse(row.payload) : null; }
function historyList(limit = 50) {
  return db.prepare('SELECT revision, at, user, action FROM audit ORDER BY id DESC LIMIT ?').all(Math.max(1, Math.min(200, Number(limit) || 50)));
}
function commitState(state, { baseRevision = null, user = 'unknown', action = 'save' } = {}) {
  const cur = currentRow();
  if (baseRevision !== null && Number(baseRevision) !== Number(cur.revision)) {
    const err = Object.assign(new Error('Revision conflict'), { status: 409, currentRevision: cur.revision }); throw err;
  }
  const now = new Date().toISOString();
  const next = Number(cur.revision || 0) + 1;
  const payload = JSON.stringify(state);
  db.exec('BEGIN IMMEDIATE');
  try {
    if (cur.payload) {
      db.prepare('INSERT OR REPLACE INTO history(revision,payload,updated_at,updated_by,action) VALUES(?,?,?,?,?)')
        .run(cur.revision, cur.payload, cur.updated_at, cur.updated_by, action === 'save' ? 'snapshot' : action);
    }
    db.prepare('UPDATE state_store SET revision=?, payload=?, updated_at=?, updated_by=? WHERE id=1').run(next, payload, now, user);
    db.prepare('INSERT INTO audit(revision,at,user,action) VALUES(?,?,?,?)').run(next, now, user, action);
    db.exec('COMMIT');
  } catch (e) { db.exec('ROLLBACK'); throw e; }
  return { revision: next, updatedAt: now, updatedBy: user };
}
function restoreRevision(revision, user) {
  const snap = db.prepare('SELECT payload FROM history WHERE revision=?').get(Number(revision));
  if (!snap) throw Object.assign(new Error('Revision not found'), { status: 404 });
  return commitState(JSON.parse(snap.payload), { baseRevision: currentRow().revision, user, action: `restore:${revision}` });
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    if (url.pathname === '/api/health') return sendJson(res, 200, {
      ok: true, app: 'range-operation-platform', version: '2.0.16', storage: DB_FILE,
      storageEngine: 'sqlite', authConfigured: Object.values(TOKENS).some(Boolean)
    });
    if (url.pathname === '/api/session' && req.method === 'GET') {
      const a = auth(req, 'viewer'); return sendJson(res, 200, { ok: true, role: a.role, authenticated: a.role !== 'none' });
    }
    if (url.pathname === '/api/state' && req.method === 'GET') {
      const a = requireRole(req, res, 'viewer'); if (!a) return;
      const row = currentRow(); return sendJson(res, 200, {
        ok: true, state: row.payload ? JSON.parse(row.payload) : null, revision: row.revision,
        updatedAt: row.updated_at, updatedBy: row.updated_by, role: a.role
      });
    }
    if (url.pathname === '/api/state' && req.method === 'PUT') {
      const a = requireRole(req, res, 'editor'); if (!a) return;
      const body = JSON.parse(await readBody(req) || '{}'); const payload = body.state ?? body;
      if (!payload || typeof payload !== 'object') return sendJson(res, 400, { ok: false, error: 'Invalid state' });
      try {
        const meta = commitState(payload, { baseRevision: body.baseRevision ?? null, user: body.user || req.headers['x-range-user'] || a.role, action: 'save' });
        return sendJson(res, 200, { ok: true, ...meta });
      } catch (e) {
        if (e.status === 409) return sendJson(res, 409, { ok: false, error: e.message, currentRevision: e.currentRevision });
        throw e;
      }
    }
    if (url.pathname === '/api/history' && req.method === 'GET') {
      const a = requireRole(req, res, 'viewer'); if (!a) return;
      return sendJson(res, 200, { ok: true, history: historyList(url.searchParams.get('limit')), role: a.role });
    }
    if (url.pathname.startsWith('/api/restore/') && req.method === 'POST') {
      const a = requireRole(req, res, 'admin'); if (!a) return;
      const rev = Number(url.pathname.split('/').pop()); if (!Number.isFinite(rev)) return sendJson(res, 400, { ok: false, error: 'Invalid revision' });
      const meta = restoreRevision(rev, req.headers['x-range-user'] || 'admin'); return sendJson(res, 200, { ok: true, ...meta });
    }
    if (STATIC_FILES.has(url.pathname)) {
      const [file, type] = STATIC_FILES.get(url.pathname); return sendFile(res, file, type);
    }
    res.writeHead(404); res.end('Not found');
  } catch (error) {
    sendJson(res, error.status || 500, { ok: false, error: error.message || 'Server error' });
  }
});

server.listen(PORT, '0.0.0.0', () => console.log(`Range Operation Platform v2.0.16 listening on ${PORT} · SQLite ${DB_FILE}`));
