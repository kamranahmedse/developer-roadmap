# claude -p

The `claude -p` command (short for --print) activates Print Mode, which runs Claude Code as a non-interactive, single-use utility rather than a continuous chat session. When you use this flag, you provide a prompt directly in the command line; Claude then executes its agentic loop—researching, editing files, or running commands as needed—and exits immediately once the task is complete. This mode is designed primarily for automation and scripting, allowing you to integrate Claude's reasoning into CI/CD pipelines, shell scripts, or "one-liners".

Visit the following resources to learn more:

- [@official@CLI commands](https://code.claude.com/docs/en/cli-reference#cli-commands)
- [@official@Run Claude Code programmatically](https://code.claude.com/docs/en/headless)
- [@video@Building headless automation with Claude Code | Code w/ Claude](https://www.youtube.com/watch?v=dRsjO-88nBs)