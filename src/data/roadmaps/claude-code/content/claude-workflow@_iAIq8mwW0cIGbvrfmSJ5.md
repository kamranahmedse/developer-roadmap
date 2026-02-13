# Claude Workflow

The Claude Code workflow operates as a continuous agentic loop where the AI moves through four primary phases: Explore, Plan, Implement, and Verify. It begins by indexing your local codebase and reading persistent instructions from your [CLAUDE.md](http://CLAUDE.md) file to align with your project's specific standards. When you issue a prompt, Claude uses its suite of built-in tools to research the files (Explore), proposes a detailed step-by-step strategy for the change (Plan), and—upon your approval—executes the modifications using file-editing and shell tools (Implement). The cycle concludes by running your defined test suites or linters (Verify) to ensure no regressions were introduced, often utilizing MCP servers to sync the final results with external platforms like GitHub or Jira.

Visit the following resources to learn more:

- [@official@How Claude Code Works](https://code.claude.com/docs/en/how-claude-code-works)
- [@official@Common workflows](https://code.claude.com/docs/en/common-workflows)
- [@article@My Best Workflow for Working with Claude Code : r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/comments/1m3pol4/my_best_workflow_for_working_with_claude_code/)
- [@video@Claude Code Workflows That Will 10x Your Productivity](https://www.youtube.com/watch?v=yZvDo_n12ns)
- [@video@The greatest Claude Code workflow ever (10x your speed)](https://www.youtube.com/watch?v=WdD6uD_kupY)