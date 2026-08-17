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


### v2.0.9 Baseline lock
- Dashboard Project baseline: 12px from row bottom for both bar and marker.
- Dashboard Task baseline: 10px from row bottom for both bar and marker.
- Dashboard Sub-Task/Milestone baseline: 9px from row bottom for both bar and marker.
- Detail Plan marker lower edge remains aligned with the 34px Gantt-bar lower edge.


## v2.0.11 verification
- `node --check app.js`: PASS
- `node --check server.js`: PASS
- `/api/health`: PASS, version 2.0.11
- VM render smoke test: Dashboard Gantt renders interactive milestone markers, right-side detail drawer shell, non-wrapping Live Week header, and updated 761px freeze pane.
- Multi-live-week smoke test: projects with multiple live-driver milestones return multiple distinct week labels (for example W37 · W39).

## v2.0.12 regression checks
- `app.js` syntax check: PASS
- `server.js` syntax check: PASS
- `/api/health` reports v2.0.12: PASS
- Seed data contains `masters.workstreams`: PASS
- Plan Item editor contains Workstream dropdown + free-form Task input: PASS
- Master Data exposes Workstream Master and no editable Task Master: PASS


## v2.0.13 regression checks
- Edit Plan Item field order: PASS
- Optional Task/Sub-Task save: PASS
- Bar-label fallback helper: PASS
- Milestone-only orange marker rendering: PASS
- `/api/health` reports v2.0.13: PASS

## v2.0.15 regression checks
- `app.js` syntax: PASS
- `server.js` syntax: PASS
- Detail Plan runtime render: PASS
- Detail Plan group modes (`Milestone`, `Workstream`, `Workstream → Task`, `Workstream → Task → Sub-Task`): PASS
- Master Data draggable rows: PASS (all Workstream, Key Milestone and Responsible Unit rows)
- `/api/health` reports v2.0.15: PASS


### v2.0.16 Master reference deletion
- Verified reference scanning for Workstream, Key Milestone, and Responsible Unit Master.
- Verified used items are blocked from deletion and usage locations are displayed.
- Verified unused items can be deleted after confirmation.
