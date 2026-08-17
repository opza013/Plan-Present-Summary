# v2 Architecture

## Client
The client keeps an offline-first local copy in browser localStorage. In Team Sync mode it uses the server as the shared source with revision numbers.

## Shared data flow
1. Client loads revision N.
2. User edits locally.
3. PUT `/api/state` sends `baseRevision: N`.
4. Server writes only if current revision is still N.
5. If another user already created revision N+1, server returns HTTP 409 and the client offers to pull the latest state.

## SQLite tables
- `state_store` — current full application state and current revision.
- `history` — snapshot of earlier revisions.
- `audit` — user/action/timestamp per committed revision.

## Access roles
- Viewer: read state/history.
- Editor: Viewer + save state.
- Admin: Editor + restore an earlier revision.

## Data model
Project
→ Task / Workstream
→ Phase / Sub-Task
→ Plan Item
  - Activity (duration)
  - Milestone (point / gate)

A plan item may also be marked as Critical Path or Primary Live Milestone.


### Dashboard hierarchy v2.0.3
Dashboard rendering supports Project → Task → Sub-Task → Milestone/Activity. Structural collapse state is persisted under `dashboard.collapsedProjects`, `collapsedTasks`, and `collapsedSubTasks`; leaf detail expansion is persisted under `dashboard.expandedMilestones`.


## Dashboard interaction layer (v2.0.11)
- Dashboard timeline viewport supports mouse hold-and-drag panning. Horizontal movement changes the timeline scroll position; vertical movement scrolls the project hierarchy.
- Milestone triangles carry activity IDs and open a fixed right-side detail drawer without changing the planning model.
- Dashboard Live Week display aggregates distinct live-driver weeks from all plan items under a project; Primary Live remains the principal live-driver field.

## Schema v4 hierarchy (v2.0.12)
`Project → Workstream → Task → Sub-Task/Phase → Activity/Milestone`

- **Workstream**: controlled vocabulary from `masters.workstreams`; edited in Master Data and selected from a dropdown in the Plan Item editor.
- **Task**: free-form text stored on each plan item; there is no Task Master dependency.
- Existing schema-v3 records migrate non-destructively by copying the former combined Task/Workstream value into `workstream` while retaining the legacy task text.

## v2.0.13 plan-item semantics
- Edit order: Workstream → Milestone → Task → Sub-Task.
- Workstream and Milestone are required; Task/Sub-Task are optional free-form planning detail.
- Visible bar label resolves in this order: Sub-Task → Task → Milestone.
- Orange timeline triangle is a milestone semantic marker and is rendered only for Item Type = Milestone at Planned Start.

## v2.0.20 NWT responsibility mapping
- `masters.nwts[]`: ordered NWT definitions `{name, units[]}`.
- `masters.milestones[].nwt`: links a Key Milestone to one NWT definition.
- Detail Plan resolves allowed Responsible Units through `milestoneResponsibleUnits(key)`; NWT mapping is authoritative when configured, with legacy milestone units retained only for backward compatibility.
- Plan Item responsibilities remain `{unit,pic}` and can contain multiple assignments selected from the NWT-derived allowed list.
