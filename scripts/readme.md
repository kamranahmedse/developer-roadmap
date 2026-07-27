## Content Sync Scripts

> Scripts that keep the `roadmaps/` content in this repository and the roadmap.sh
> database in sync. All three are driven by GitHub Actions in `.github/workflows`,
> but can be run locally too.

Shared helpers live in `scripts/lib`.

## `sync-content-to-repo.ts`

Pulls topic content out of the database and writes it into
`roadmaps/<slug>/content/<label>@<nodeId>.md`. Used to seed or refresh the repo
mirror of a roadmap.

```bash
npm run sync:content-to-repo -- --roadmap-slug=frontend --secret=<GH_SYNC_SECRET>
```

Workflow: `sync-content-to-repo.yml` (dispatched from the backoffice). It opens a
PR with whatever changed.

## `sync-repo-to-database.ts`

The other direction, and the one community PRs flow through. Parses each content
file, splits the resource list out of the description, maps the resource type
prefixes (`@article@`, `@video@`, ...) and posts everything to
`/v1-sync-official-roadmap-topics`.

```bash
npm run sync:repo-to-database -- --files=roadmaps/frontend/content/html@node-id.md --secret=<GH_SYNC_SECRET>
```

`--files` is a comma separated list. Anything that is not a `.md` file under a
`content/` directory is skipped.

Workflow: `sync-repo-to-database.yml`.

## `cleanup-orphaned-content.ts`

Compares the files on disk against the roadmap nodes in the database and removes
or renames the leftovers: same node id with an outdated slug (renamed, or deleted
when the correct file already exists), same slug with a stale node id (deleted),
and topics that no longer exist on the roadmap (deleted).

```bash
npm run cleanup:orphaned-content -- --roadmap-slug=frontend
npm run cleanup:orphaned-content -- --roadmap-slug=__all__
```

`__all__` walks every directory under `roadmaps/` that has a `content/` folder.
A markdown report is written to `.cleanup-summary.md`, which the workflow uses as
the PR body.

Workflow: `cleanup-orphaned-content.yml`.
