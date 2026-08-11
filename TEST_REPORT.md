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


### v2.0.7 Weekend display
- Verified Day view renders weekend hatch.
- Verified Week/Month views do not generate weekend bands.


### v2.0.8 Milestone triangle baseline
- Dashboard Project marker base aligns to Project Active Phase lower edge (12px bottom baseline).
- Dashboard Task marker base aligns to Task Active Phase lower edge (10px bottom baseline).
- Dashboard Sub-Task and Milestone marker base aligns to their bar lower edge (9px bottom baseline).
- Detail Plan start marker base aligns to Gantt activity bar lower edge (34px from row top).
