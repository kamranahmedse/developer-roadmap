# Locations of CLAUDE.md

Claude Code manages instructions through a hierarchical memory system that layers context based on the directory structure of your project. At the start of every session, Claude recursively searches from your current working directory up to the root, automatically loading global preferences from `~/.claude/CLAUDE.md` and shared team standards from the project root's `CLAUDE.md`. While these high-level rules establish the "WHY" and "HOW" for the entire codebase, Claude also supports progressive disclosure via subdirectory [CLAUDE.md](http://CLAUDE.md) files; these are loaded on demand only when Claude reads a file within that specific folder (e.g., `./src/api/CLAUDE.md`). This location-based behavior prevents "context bloat" by ensuring specialized rules—like specific API middleware requirements or frontend styling—only occupy the context window when they are relevant to the task at hand. By strategically placing instructions closer to the code they govern, you maintain a sharper, more token-efficient model that prioritizes local conventions over global defaults without losing sight of the project's overall architecture.

Visit the following resources to learn more:

- [@official@Write an effective CLAUDE.md](https://code.claude.com/docs/en/best-practices)
- [@official@Determine memory type](https://code.claude.com/docs/en/memory#determine-memory-type)
- [@article@The Complete Guide to CLAUDE.md](https://www.builder.io/blog/claude-md-guide)