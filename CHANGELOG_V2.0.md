# Range Operation Platform v2.0.0

## Consolidated roadmap v1.4 → v2.0

### Data model
- Added Workstream / Phase semantics to existing Task / Sub-Task structure.
- Added Activity vs Milestone item type.
- Added activity weights and calculated progress.
- Added owner-reported progress mode.
- Added Primary Live Milestone.
- Added Critical Path flag.
- Unified project status model.

### Dashboard
- Executive metric strip.
- Saved Views.
- Fit and Today commands.
- Expand / collapse Sub-Task phasing.
- Improved milestone collision detection using measured text width.
- Criticality can be used for Section / Sub-Section grouping.

### Project / Detail Plan
- Capacity Hours and Criticality fields.
- Weekly Update / Current Focus field.
- Critical Path highlighting in Gantt.
- Existing click / drag / resize interactions retained.

### Team and governance
- SQLite shared team store.
- Auto-sync option.
- Optimistic revision conflict detection.
- Viewer / Editor / Admin token roles.
- Audit history and Admin restore.

### Architecture
- Split monolithic HTML into `index.html`, `styles.css`, `seed-data.js` and `app.js`.
- Server serves static assets and the shared SQLite API.
- Added persistent Render Blueprint option.


## v2.0.1
- Added hierarchical Dashboard drill-down: Project → Task → Sub-Task.
- Added per-Project and per-Task expand/collapse controls.
- Added Expand All / Collapse All commands.
