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
