## v2.0.5
- Weekend diagonal bands and start triangles.


## v2.0.4
- Dashboard Month / Week / Day timeline header now remains visible while vertically scrolling through project, task, sub-task and milestone rows.
- Sticky dashboard timeline header stays synchronized with horizontal Gantt scrolling.
- Weekend treatment changed from diagonal hatching to solid grey vertical lines.
- Solid weekend lines are applied across Dashboard project/task/sub-task/milestone timelines and Detail Plan Gantt rows in Day view.
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


## 2.0.2
- Dashboard hierarchy now supports Project → Task → Sub-Task expand/collapse.
- Sub-Task collapse hides milestone detail while preserving phase duration context.


## 2.0.3
- Fixed missing Task/Sub-Task expand/collapse controls.
- Added Milestone/Activity child rows with independent +/- details.
- Dashboard hierarchy is now Project → Task → Sub-Task → Milestone/Activity.


### v2.0.6
- Progressive Project → Task → Sub-Task → Milestone disclosure on Dashboard.
- Collapsed hierarchy rows retain orange start markers and milestone labels/dates.
- Expanded rows transfer milestone detail to the next hierarchy level to avoid duplicate visual clutter.
