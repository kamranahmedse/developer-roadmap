# Locations of CLAUDE.md

Claude Code manages instructions through a hierarchical memory system that layers context based on the directory structure of your project. At the start of every session, Claude recursively searches from your current working directory up to the root, automatically loading global preferences from `~/.claude/CLAUDE.md` and shared team standards from the project root's `CLAUDE.md`. Claude also supports progressive disclosure via subdirectory [CLAUDE.md](http://CLAUDE.md) files.

Visit the following resources to learn more:

- [@official@Write an effective CLAUDE.md](https://code.claude.com/docs/en/best-practices)
- [@official@Determine memory type](https://code.claude.com/docs/en/memory#determine-memory-type)
- [@article@The Complete Guide to CLAUDE.md](https://www.builder.io/blog/claude-md-guide)