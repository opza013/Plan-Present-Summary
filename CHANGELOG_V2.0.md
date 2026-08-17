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


## v2.0.7
- Weekend hatch is lighter/thinner and shown only in Day view.
- Week and Month views no longer render weekend shading.
- Applied consistently to Dashboard and Detail Plan Gantt.

## v2.0.8
- Aligned the lower edge of every orange milestone/start triangle with the lower edge of the active bar shown on the same row.
- Applied consistently across Dashboard Project, Task, Sub-Task, Milestone/Activity rows and Detail Plan Gantt.
- Preserved milestone collision levels, stems, hierarchy, zoom and time-scale behavior.


## v2.0.9
- Hard-locked milestone marker lower edges to the active-bar lower edge using a shared baseline variable.
- Removed row-height-dependent marker drift across Project, Task, Sub-Task and Milestone rows.
- Converted marker geometry to fixed-size clip-path triangles for pixel-stable alignment.


## v2.0.10
- Added Dashboard freeze-pane behavior for key detail columns during left/right timeline scrolling.
- Sticky Dashboard header now preserves key-detail headers while Month/Week/Day bands remain synchronized with horizontal scroll.
- Hierarchy and grouped section labels stay visible as users inspect distant milestones.


## v2.0.11
- Added free mouse drag panning across Dashboard timeline in four directions.
- Orange milestone triangles now open a right-side milestone detail drawer inspired by OnePlan Detail Plan.
- Added milestone detail fields and Next Steps plus direct Edit/Open Detail Plan actions.
- Dashboard Live Week header no longer wraps.
- Dashboard Project rows display all distinct Live Weeks contained in the project.


## v2.0.12
- Split Workstream and Task into independent fields.
- Added editable Workstream Master and Workstream dropdown in Plan Item editor.
- Converted Task to free-form entry.
- Updated Dashboard, Detail Plan, Presentation and milestone drawer paths to include Workstream.


## v2.0.13
- Reordered Edit Plan Item fields to Workstream → Milestone → Task → Sub-Task.
- Made Task/Sub-Task optional.
- Added Sub-Task → Task → Milestone bar-label fallback.
- Restricted orange start triangles to Item Type = Milestone only.


## v2.0.15
- Fixed Detail Plan page rendering (`groupRow` runtime error).
- Added drag-and-drop ordering across all Master Data lists.

## v2.0.15
- Hardened Detail Plan navigation and rendering for legacy/incomplete browser or server data.
- Added self-repair normalization for plan items, responsibilities, next steps, and dates.
- Timeline now ignores undated items instead of allowing invalid dates to break/expand the Gantt.
- Added Detail Plan render recovery with Repair data & Retry.
- Replaced Workstream/Task/Sub-Task Add Item inline argument handlers with data attributes + event listeners.


## v2.0.16
- Master Data deletion now performs a reference scan before deletion.
- Workstream usage lists every Project/Plan Item that references the Workstream.
- Milestone usage lists every Project/Plan Item that uses the Milestone code.
- Responsible Unit usage lists both Milestone Master defaults and Plan Item PIC/responsibility references.
- Used Master Data is protected from deletion until all references are removed or changed.
- Unused Master Data shows an explicit safe-to-delete confirmation.


## v2.0.17
- Added Replace-before-Delete workflow for Master Data.
- In-use Key Milestone can be reassigned to another Milestone directly from the delete dialog before the old Milestone is deleted.
- The same controlled replacement flow is available for Workstream and Responsible Unit Masters.
- Delete dialog continues to show every current reference and blocks deletion when no replacement Master exists.
- Replacement preserves Plan Item dates, status, PIC names, Task and Sub-Task; Responsible Unit replacement deduplicates unit assignments.
## v2.0.18
- Gantt typography standardized: Milestone text uses bold gray; Task/Sub-Task/Activity text uses regular gray.
- Applied to Dashboard activity bars, Dashboard milestone labels, and Detail Plan Gantt bars.

