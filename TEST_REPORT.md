
## v2.0.4 sticky timeline + weekend regression
- `app.js` syntax: PASS
- `server.js` syntax: PASS
- `/api/health`: PASS, reports v2.0.4 and SQLite storage
- Dashboard sticky Month/Week/Day floating header: implemented with horizontal scroll synchronization
- Dashboard weekend lines: solid grey vertical lines across project/task/sub-task/milestone/section rows
- Detail Plan weekend lines: solid grey vertical lines in Day, Week and Month Gantt scales
# v2.0 QA Report

Validated before packaging:
- `node --check server.js`
- `node --check app.js`
- `node --check seed-data.js`
- Server startup on Node 22
- Static assets: index, CSS, seed data, app JS
- `/api/health`
- SQLite state save
- revision increment
- audit history
- revision conflict returns HTTP 409
- Admin restore of prior revision
- lightweight DOM runtime harness rendered Dashboard, Detail Plan, Project modal, Activity modal and Team Governance modal

The app retains the existing browser storage key so v1.3.x local data can migrate in place.


## v2.0.3 hierarchy toggle regression
- `node --check app.js`: PASS
- `node --check server.js`: PASS
- `/api/health`: PASS, reports v2.0.3 and SQLite storage
- Task/Sub-Task controls now use DOM data attributes rather than quote-sensitive inline string arguments.
- Milestone/Activity rows expose independent expand/collapse detail controls.
