# Range Plan Presenter v1.1.0

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


## v1.1.0
- Dashboard redesigned as a portfolio Gantt based on the supplied ROM Development Plan 2026 layout.
- Left columns: Process, PIC, Status.
- Timeline grouped by Month and ISO Week.
- Blue Active Phase bar for each project.
- Yellow milestone triangles generated from Detail Plan activities.
- Red dashed current-date marker with “We're here”.
- Clicking a process opens its Detail Plan.
