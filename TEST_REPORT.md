# Range Operation Platform v2.0.5 — Test Report

Validated locally on 2026-08-11:

- `node --check app.js` — PASS
- `node --check server.js` — PASS
- Server startup with temporary SQLite data directory — PASS
- `GET /api/health` returns version `2.0.5` — PASS
- Static root page serves — PASS
- Dashboard weekend renderer uses full-width `portfolio-weekend-band` elements — PASS
- Detail Plan Day / Week / Month renderers use `gantt-weekend-band` elements — PASS
- Dashboard duration rows retain orange start marker at Planned Start — PASS
- Detail Plan timeline rows include orange start marker at Planned Start — PASS
