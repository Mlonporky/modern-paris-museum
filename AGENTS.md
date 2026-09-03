# Project Agent Instructions

## User address

- Address the user as `呆呆猪`.

## Session handoff

1. At the start of a new session, read this file first.
2. Read only the most recent part of `worklog.md` by default. Use a tail-style read of roughly the last 120 lines or the last two log entries.
3. Do not read the entire `worklog.md` unless the recent entries are insufficient.
4. When older context is needed, search `worklog.md` by task name, date, file path, or commit hash, and read only the matching area.
5. Confirm the current repository state with `git status --short --branch` before modifying files.
6. Continue from the `Next step` in the newest worklog entry instead of restarting completed work.

## Worklog writing rules

1. Append a new entry to the end of `worklog.md` whenever a project part is completed.
2. Also append a handoff entry when work pauses partway through a task.
3. Never rewrite or delete older worklog entries during ordinary work.
4. Keep each entry concise and use this structure:

```md
## YYYY-MM-DD HH:mm — Part name

- Status: completed | in progress | blocked
- Changed: files or behavior changed
- Verified: commands run and their result
- Commit: hash and message, or `not committed`
- Next step: one concrete continuation point
```

5. Record evidence, not assumptions. Do not mark a part completed without fresh verification.
6. Never write passwords, access tokens, private keys, real private email addresses, or other secrets to the worklog.

## Project workflow

- Follow the approved design in `docs/superpowers/specs/2026-08-21-impressionist-online-museum-design.md`.
- Follow the task sequence in `docs/superpowers/plans/2026-08-21-modern-paris-museum-implementation.md`.
- Work in small educational increments: explain the concept, make a small change, show the diff, verify it, then continue.
- The user has no programming background. Explain HTML, CSS, JavaScript, Astro, Git, and GitHub in plain Chinese without assuming prior knowledge.

## Current project status

- Updated: 2026-09-02
- Status: completed for the current milestone. The homepage opens on a black six-century gateway; the 19th-century node enters the existing modern Paris exhibition; the gateway has cinematic moving light, breathing halos, flowing axis light, refined curatorial copy, responsive horizontal exploration, and reduced-motion support.
- Preview: `http://localhost:4321/`
- Verified: `npm run verify` passed with 0 Astro errors, 0 warnings, 0 hints, 14 tests, and four valid JPEGs; browser checks confirmed 19th-century entry, return navigation, 390px document-width safety, and no browser errors or warnings.
- Git: feature history through `82a50e7` was pushed to `origin/main`; this file records the current status for future sessions.
- Next step: No required work remains for this milestone. If continuing, review the gateway transition or add real content for the 20th and 21st centuries.
