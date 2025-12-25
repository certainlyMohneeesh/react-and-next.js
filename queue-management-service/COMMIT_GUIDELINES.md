Recommended git workflow (local)

# Create a feature branch
git checkout -b feat/queue-shadcn

# Stage and commit often per feature
git add src/components/ui
git commit -m "feat(ui): add shadcn-like UI primitives"

# After finishing a logical unit
git add .
git commit -m "feat(queue): add QueueProvider, refactor form and display, add CSV import/export"

# Push branch and open PR
git push -u origin feat/queue-shadcn

Notes:
- Use small, focused commits with conventional messages (feat, fix, chore)
- Keep one logical feature per commit when possible
- Run tests and lint before committing if you add them
