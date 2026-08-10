# Range Operation Platform v1.3.1

Standalone web app for creating project Detail Plans manually and presenting executive updates. It does not depend on OnePlan or SharePoint.

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
