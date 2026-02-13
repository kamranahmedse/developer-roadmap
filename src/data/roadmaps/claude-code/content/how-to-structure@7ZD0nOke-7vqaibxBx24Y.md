# How to Structure CLAUDE.md

To write an effective [CLAUDE.md](http://CLAUDE.md), you should treat it as a concise, persistent "source of truth" that provides Claude with the project-specific context it cannot infer from the code alone. According to the official best practices, the file should be kept short and human-readable, focusing on non-obvious information like unique bash commands for building and testing, repository-specific code styles (e.g., "Use ES modules, not CommonJS"), and architectural decisions. You should strictly exclude anything Claude can figure out by reading the code, standard language conventions, or self-evident advice like "write clean code," as a bloated file causes the model to ignore your actual instructions. Structure the document with clear headings and use the `@path/to/file` syntax to import external documentation (like `README.md` or `package.json`) to keep the core [CLAUDE.md](http://CLAUDE.md) lean. Treat the file like code: refine it over time using the `/init` command to bootstrap a version, prune it regularly to ensure high adherence, and commit it to Git, so your entire team benefits from the shared context.

Visit the following resources to learn more:

- [@official@Write an effective CLAUDE.md](https://code.claude.com/docs/en/best-practices#write-an-effective-claude-md)
- [@article@How to structure your CLAUDE.md file](https://www.builder.io/blog/claude-md-guide)
- [@article@How we structure our CLAUDE.md file (and why) : r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/comments/1mecx5t/how_we_structure_our_claudemd_file_and_why/)
- [@article@# Writing a good CLAUDE.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)