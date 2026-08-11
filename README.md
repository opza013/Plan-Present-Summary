# Range Operation Platform v2.0.5 — Integrated Control Tower

This release consolidates the planned v1.4–v2.0 roadmap into one application. It keeps the current Project List, Dashboard, Detail Plan, Gantt and Presentation workflows, while upgrading the planning model, dashboard UX, shared team storage and governance.

## Integrated v2.0 capabilities

### 1. Planning model
- Project → Task / Workstream → Phase / Sub-Task → Activity / Milestone.
- Activity vs Milestone item type.
- Activity weight for calculated progress.
- Reported Progress mode for management reporting when the owner needs to override calculated progress.
- Primary Live Milestone flag as the source of truth for Live Week.
- Critical Path flag for plan items; critical bars are highlighted in Detail Plan Gantt.
- Unified project status: Upcoming, On Track, At Risk, Delayed, On Hold, Completed.

### 2. Portfolio Control Tower Dashboard
- Section + Sub-Section grouping using existing project fields or Custom Section.
- Sub-Task Phasing / Project Summary timeline rows.
- Month / Week / Day scale and 25–200% zoom.
- Fit-to-window and Today commands.
- Expand / collapse project phasing.
- Saved Dashboard Views that preserve filters, grouping, sorting, scale and zoom.
- Text-width-based milestone collision layout for cleaner label stacking.
- Active Phase, milestone labels, planned start date and milestone connectors.
- Executive metrics: visible projects, completed, risk/delay, live in next 4 weeks, overdue actions, planned capacity hours.

### 3. Detail Plan
- Click a Gantt item to edit.
- Drag an item to move the plan.
- Drag left/right edges to resize duration.
- Day / Week / Month Gantt with Task / Phase grouping.
- Critical Path indicator.
- Weekly Update / Current Focus area.
- Project Capacity Hours and Criticality.

### 4. Shared Team Storage
- SQLite team store on the Render service (`node:sqlite`, no third-party DB package required).
- Optional auto-sync mode.
- Optimistic revision control: conflicting edits are detected instead of silently overwriting newer team data.
- Local browser mode remains available for offline / personal work.

### 5. Governance
- Optional Viewer / Editor / Admin access tokens via environment variables.
- Audit history for shared team saves.
- Revision restore for Admin.
- User/editor name recorded with revisions.

### 6. Presentation
- Existing 16:9 management presentation retained.
- Weekly Update is used as the management summary when available.
- Unified project status and progress model feeds Presentation.

## Render deployment

### Trial / single-user
Use `render.yaml`. It runs on the free plan and stores the SQLite database under `/tmp`, so server data is not durable across replacement/redeploy. Browser local data remains available per browser.

### Persistent team deployment
Use `render-persistent.yaml`. It mounts `/var/data` and stores the SQLite database there. Configure access tokens in Render:
- `RANGE_ADMIN_TOKEN`
- `RANGE_EDITOR_TOKEN`
- `RANGE_VIEW_TOKEN`

If no access tokens are configured, the server operates in open Admin mode for backward compatibility; do not use that mode for a broadly accessible production URL.

## Migration from v1.3.x
The browser storage key remains unchanged. Existing projects, activities, dashboard visibility, custom sections, imported weekly update data and master data are preserved. v2 adds new fields with safe defaults when old data is loaded.

## Source structure
- `index.html` — application shell only.
- `styles.css` — UI / Gantt / dashboard styling.
- `seed-data.js` — current seed dataset.
- `app.js` — client application logic.
- `server.js` — static server + SQLite shared store + revision/audit APIs.
- `render.yaml` — free/trial deployment.
- `render-persistent.yaml` — persistent team deployment.


## v2.0.1
- Dashboard hierarchy now expands as Project → Task / Workstream → Sub-Task / Phase.
- Each Project has its own expand/collapse control.
- Each Task has an independent expand/collapse control for its Sub-Tasks.
- Expand All / Collapse All controls are available at Dashboard level.
- Task rows show their aggregate active phase; Sub-Task rows show phase bars and milestone detail.
- Collapse state persists in the dashboard state without changing project planning data.


## v2.0.2
- Added +/− expand/collapse control at Sub-Task level on Dashboard.
- Collapsed Sub-Task keeps its phase bar visible while hiding milestone labels, connector lines and triangles.
- Expanded Sub-Task restores the full milestone timeline.
- Expand All / Collapse All now also manages Project, Task and Sub-Task hierarchy states.


## v2.0.4
- Fixed Dashboard Task/Sub-Task +/- controls that could disappear because inline handler arguments broke HTML attributes for real task/sub-task names.
- Replaced Task/Sub-Task inline toggle arguments with safe data attributes and delegated initialization.
- Added a fourth Dashboard hierarchy level: Project → Task → Sub-Task → Milestone/Activity.
- Sub-Task +/- now expands or collapses its Milestone/Activity rows.
- Each Milestone/Activity row has its own +/- to show or hide dates, status, PIC, Primary Live and Critical Path details.
- Expand All / Collapse All now includes Milestone detail rows.


### v2.0.4 UI timeline improvements
- Sticky Month / Week / Day dashboard header during vertical scrolling.
- Horizontal timeline position remains synchronized in the sticky header.
- Weekend is indicated with solid grey vertical lines instead of diagonal shading across Gantt views.


## v2.0.5
- Weekend columns in Dashboard and Detail Plan Gantt now use grey diagonal hatch bands across the full vertical timeline instead of thin solid lines.
- Weekend bands remain visible in Day, Week and Month time scales.
- Orange start triangles are preserved at the planned start of every timeline item/milestone in Dashboard detail rows and Detail Plan Gantt.
- Duration activities keep their active bar while also showing the orange start marker.
- Updated stacking so weekend shading never obscures Active Phase bars, milestone markers, or draggable Gantt bars.
