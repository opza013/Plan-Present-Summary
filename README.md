# Range Plan Presenter v1.0.0

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
