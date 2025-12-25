Queue Management Service - Features

Overview:
- Local shadcn-style UI primitives (safe local implementations): `Button`, `Card`, `Input`, `Select`, `Dialog`, `Toast` in `src/components/ui` (these can be swapped with official shadcn components later).
- Centralized queue state in `src/context/queue-context.jsx` with localStorage persistence and toast notifications.
- Add items via `QueueForm` (keyboard focus: press `n` to focus name input).
- `QueueDisplay` supports:
  - Search by name or service (`/` focuses search box)
  - Filter by status
  - Sort by newest/oldest/name/status
  - Bulk select / mark completed
  - Export & import CSV
  - Remove with confirm dialog
  - Accessible focus states and ARIA labels
- Global shortcuts (press `Ctrl/Cmd + D` to open clear-queue confirm dialog)

Notes for installing shadcn/components:
- The app includes local `src/components/ui/*` components to keep the app working without additional installs; when you install shadcn, replace the local components with shadcn equivalents and keep the same exports/names.

Recommended git commit messages per step:
- feat(ui): add shadcn-like UI primitives
- feat(state): add QueueProvider with localStorage persistence
- feat(form): refactor QueueForm to use UI primitives
- feat(display): add search, filter, sort, CSV import/export, bulk actions
- feat(accessibility): add keyboard shortcuts and focus management
