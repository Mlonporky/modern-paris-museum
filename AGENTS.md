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

