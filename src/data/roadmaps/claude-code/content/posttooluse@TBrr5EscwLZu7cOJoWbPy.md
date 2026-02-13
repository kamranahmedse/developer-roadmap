# PostToolUse

The `PostToolUse` hook is a reactive lifecycle event that triggers immediately after a tool (like Bash, Write, Edit, or a custom MCP tool) completes its execution. While the `PreToolUse` hook acts as a guard to block actions, the `PostToolUse` hook is designed for automation, cleanup, and quality control—ensuring that every action Claude takes adheres to your project's standards.

Visit the following resources to learn more:

- [@official@Hooks reference](https://code.claude.com/docs/en/hooks)
- [@official@Automate workflows with hooks](https://code.claude.com/docs/en/hooks-guide)