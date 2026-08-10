# Range Operation Platform v1.3.14

Standalone web app for creating project Detail Plans manually and presenting executive updates. OnePlan ingestion/import is intentionally disabled; the app uses only its own project data and explicitly imported backups.

## Main modules
- Dashboard / project portfolio
- Project List
- Detail Plan: Task → Sub Task → Key Milestone
- Multiple Next Steps per milestone
- Gantt: Day / Week / Month and 25–200% zoom
- Presentation Mode 16:9
- Master Data: Task, Key Milestone, Responsible Unit
- Export / Import JSON
- Optional server state API

## Render
Deploy this folder as a Node web service. `render.yaml` is included.

The default `DATA_DIR` in the Blueprint is temporary. Browser localStorage is the primary client persistence in v1.0. For shared persistent server storage, point `DATA_DIR` to a persistent disk path or replace the storage adapter with a database.


## v1.2.0
- Renamed dashboard to “Range Operation: Project update”.
- Renamed application brand to “Range Operation Platform”.
- Portfolio Gantt left columns changed to Event Type, Project, Live week, Status.
- Live week is derived from Implementation / Go Live milestone, with Project Planned End as fallback.
- Key milestone labels are aligned to the same vertical level.

## v1.1.0
- Dashboard redesigned as a portfolio Gantt based on the supplied ROM Development Plan 2026 layout.
- Left columns: Process, PIC, Status.
- Timeline grouped by Month and ISO Week.
- Blue Active Phase bar for each project.
- Yellow milestone triangles generated from Detail Plan activities.
- Red dashed current-date marker with “We're here”.
- Clicking a process opens its Detail Plan.


## v1.3.0
- Imported all project data from the three supplied WK33 weekly project update decks.
- 34 projects and 223 timeline/detail-plan activities are preloaded.
- Preserves Project Type, Project Name, remarks, Hypermarket/Mini Supermarket context, timeline milestones, explicit LIVE/GO/Set Up/Relaunch dates and source update owner.
- Added imported milestone terms to Key Milestone Master and `Weekly Project Update` to Task Master.
- Existing v1.2.x browser data is migrated automatically: the sample project is removed and the imported projects/masters are merged without deleting user-created projects.
- Dashboard Live week now prioritizes LIVE milestones, then Implementation/Relaunch/GO fallbacks.
- Detail Plan and Presentation show the exact imported milestone label when it differs from the master code.

## v1.2.1
- Updated the top-left brand label so “Range Operation Platform” uses one consistent font size, weight, and color.


## v1.3.1
- Expanded Detail Plan Gantt to use the full available page width.
- Refined Gantt typography and spacing to reduce overlapping text.
- Improved Day view header into grouped Month / Week / Date bands.
- Added grey diagonal weekend shading in Day view across the header and timeline area.
- Preserved existing dashboard, imported project data, and local-storage structure.


## v1.3.2
- OnePlan ingestion/import remains disabled; no data is read from OnePlan workbooks.
- Dashboard milestone labels use collision detection and automatically move overlapping milestones to lower levels.
- Project row height grows automatically when multiple milestone levels are needed.
- Added persistent custom Dashboard Sections with add, rename, reorder, delete, and project assignment.
- Added Dashboard filters for search, Event Type, Status, Section, and Owner.
- Added sorting by Live week, Project, Event Type, Status, and Plan Start.
- Added Custom Sections / All Projects report-view switch.


## v1.3.3
- Detail Plan Gantt milestones are interactive.
- Click a Gantt milestone bar to open the existing Edit Activity modal.
- Drag the body of a milestone bar to move Planned Start and Planned End together.
- Drag the left or right edge to resize the activity duration and update Planned Start / Planned End.
- Dragging snaps to the active timeline mode: 1 day in Day view, 1 week in Week view, and 1 calendar month in Month view.
- Project Planned Start / End are recalculated automatically after a Gantt drag or resize.
- Key Milestone code in Detail Plan Structure is also clickable to edit.
- Existing v1.3.2 dashboard sections, filters, sorting, imported project data, and storage structure remain compatible.


## v1.3.4
- Dashboard Section grouping can now be derived automatically from existing Project fields.
- Added Section by options: Custom Section, Event Type, Format, Division, Department, Owner, and Status.
- Section filter dynamically follows the selected Section by field.
- Existing manual Custom Sections remain available and can still be managed/assigned when Custom Section is selected.
- Added Format to Dashboard sorting.
- Section-by preference is persisted in app state.


## v1.3.5
- Dashboard milestone labels now show each milestone planned start date.
- Milestone markers are positioned by Planned Start instead of Planned End.
- Yellow milestone triangles are anchored directly to the Active Phase bar.
- Anti-overlap label levels remain enabled; each raised label is connected to its triangle with a dashed leader line.
- Dashboard filtering, sorting, Section by fields, and Detail Plan interactive Gantt remain unchanged.


## v1.3.6
- Redesigned Project List as an inline Quick Edit table.
- Core fields shown: Event Type, Project Code/Name, Format, Owner, Plan Start, Plan End, Live Week and Status.
- Event Type, Code, Project Name, Format, Owner and Plan dates can be edited directly in the table and auto-save on change.
- Live Week remains calculated from project milestones; Status remains calculated from Detail Plan activity status to avoid conflicting sources of truth.
- Added quick search and direct Detail Plan access.
- Existing project data, Dashboard, Sections, Filters, Sorting and interactive Gantt are preserved.


## v1.3.7
- Added Format as a primary Dashboard Gantt column.
- Added nested Dashboard grouping with Section by + Sub-Section by using existing project fields.
- Sub-Section supports Event Type, Format, Division, Department, Owner and Status, with None as default.
- Added Sub-Section filter when a sub-group field is active.
- Dashboard columns Event Type, Format, Project, Live week and Status are now clickable sort headers with ascending/descending indicators.
- Preserved existing Detail Plan interactive Gantt, dashboard filters, custom sections and project data.


## v1.3.8
- Dashboard left-side project information is consistently aligned to the top-left of each row cell.
- Project List headers are clickable for ascending/descending sorting.
- Project List sortable fields: Event Type, Project, Format, Owner, Plan Start, Plan End, Live Week, and Status.
- Added sort direction indicators to Project List headers while preserving inline editing and auto-save.


## v1.3.9
- Added a per-project Dashboard Flag in Project List.
- Each project can be set to Show or Hide on Dashboard without deleting it.
- Hidden projects remain fully available in Project List, Detail Plan, Presentation, export/import, and editing.
- Existing projects migrate with Dashboard Flag = Show by default.
- Dashboard filters, groups, counts, sections, and Gantt only use projects flagged Show.
- Dashboard Flag can be sorted directly from the Project List header.
- Added Dashboard Visibility to the Project edit dialog.


## v1.3.10
- Fixed Detail Plan Structure `+ Milestone` buttons that could fail because Task names were inserted unsafely into inline click handlers.
- Added `+ Milestone` at Sub Task level so a new milestone can be created directly inside the selected Task/Sub Task.
- New milestone modal now pre-fills both Task and Sub Task when launched from a Sub Task row.
- Task selector preserves the current Task even when it is not present in Task Master.
- Existing projects, dashboard configuration, and interactive Gantt behavior are preserved.


## v1.3.11
- Added Dashboard timeline grouping: Project / Task / Task → Sub Task.
- Dashboard can expand each project into nested Task and Sub Task timeline rows while preserving project-level section/sub-section grouping.
- Added Detail Plan Gantt grouping: Milestone / Task / Task → Sub Task.
- Task/Sub Task group rows show a summary time span while the underlying milestone bars remain editable and draggable.
- Existing project data, filters, sorting, Dashboard visibility flags, and interactive Gantt behavior are preserved.


## v1.3.12
- Added Month / Week / Day time-scale selector to the Dashboard portfolio Gantt.
- Detail Plan Gantt continues to support Month / Week / Day with interactive drag/resize.
- Dashboard time-scale preference is persisted in app state.
- Day view shows Month → ISO Week → Date headers and weekend diagonal shading.
- Week view shows Month → ISO Week.
- Month view shows Month with Year band.
- Task / Sub Task grouped timeline rows work across all Dashboard time scales.


## v1.3.13
- Simplified Dashboard Timeline Rows to Project Summary or Sub-Task Phasing.
- Sub-Task Phasing is now the default dashboard timeline view.
- Removed the redundant separate Task row from dashboard phasing to reduce visual clutter.
- Each phasing row shows the Sub-Task prominently with its parent Task as context.
- Milestones remain plotted on the corresponding Sub-Task row, with phase bar, start-date labels, anti-overlap levels and connector lines.
- Existing Section/Sub-Section, filters, sorting, Month/Week/Day scales and dashboard visibility flags are preserved.


## v1.3.14
- Dashboard phasing hierarchy now displays each Task as a parent row first, followed by its indented Sub-Task rows.
- Task rows show a summary Active Phase across all milestones in that task.
- Sub-Task rows remain the detailed phasing rows and retain milestone labels, dates, anti-overlap levels, and timeline markers.
- Added visual hierarchy connector/indentation to make Sub-Tasks read as work phases under their parent Task.
- Renamed the dashboard timeline mode to “Task → Sub-Task Phasing”.
