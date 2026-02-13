# Headless mode

Headless mode in Claude Code, enabled by the `-p` (or `--print`) flag, transforms the interactive terminal assistant into a programmable Unix-style utility designed for automation and CI/CD pipelines. In this mode, Claude executes a single prompt non-interactively, printing its response directly to `stdout` before exiting, which allows you to pipe data into the agent (e.g., `cat logs.txt | claude -p "Find errors"`) or chain its output into other tools like `jq` or `grep`. While powerful for batch processing and automated code reviews, headless mode requires strict permission scoping—often using `--dangerously-skip-permissions` in isolated CI containers—to prevent the AI from performing unauthorized system actions without human oversight.

Visit the following resources to learn more:

- [@official@Run Claude Code programmatically](https://code.claude.com/docs/en/headless)
- [@article@Headless Mode: Unleash AI in Your CI/CD Pipeline](https://dev.to/rajeshroyal/headless-mode-unleash-ai-in-your-cicd-pipeline-1imm)
- [@video@Building headless automation with Claude Code | Code w/ Claude](https://www.youtube.com/watch?v=dRsjO-88nBs)