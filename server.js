import http from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const INDEX = path.join(ROOT, 'index.html');
const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(os.tmpdir(), 'range-plan-presenter'));
const STATE_FILE = path.join(DATA_DIR, 'state.json');
const MAX_BODY = 10 * 1024 * 1024;
let writeQueue = Promise.resolve();

function sendJson(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN'
  });
  res.end(JSON.stringify(data));
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

async function loadState() {
  try { return JSON.parse(await fs.readFile(STATE_FILE, 'utf8')); }
  catch (e) { if (e.code === 'ENOENT') return null; throw e; }
}

async function saveState(state) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${STATE_FILE}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(state, null, 2), 'utf8');
  await fs.rename(tmp, STATE_FILE);
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    if (url.pathname === '/api/health') return sendJson(res, 200, { ok: true, app: 'range-plan-presenter', storage: DATA_DIR });
    if (url.pathname === '/api/state' && req.method === 'GET') return sendJson(res, 200, { ok: true, state: await loadState() });
    if (url.pathname === '/api/state' && req.method === 'PUT') {
      const body = JSON.parse(await readBody(req) || '{}');
      if (!body || typeof body !== 'object') return sendJson(res, 400, { ok: false, error: 'Invalid state' });
      writeQueue = writeQueue.then(() => saveState(body));
      await writeQueue;
      return sendJson(res, 200, { ok: true, savedAt: new Date().toISOString() });
    }
    if (url.pathname !== '/' && url.pathname !== '/index.html') { res.writeHead(404); return res.end('Not found'); }
    const html = await fs.readFile(INDEX, 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
    res.end(html);
  } catch (error) {
    sendJson(res, error.status || 500, { ok: false, error: error.message || 'Server error' });
  }
});

server.listen(PORT, '0.0.0.0', () => console.log(`Range Plan Presenter listening on ${PORT}`));
