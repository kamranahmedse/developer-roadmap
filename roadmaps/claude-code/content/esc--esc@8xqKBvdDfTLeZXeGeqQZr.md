# Esc + Esc

Double-tapping the `Esc` key in Claude Code activates the Rewind feature, which serves as a temporal navigation system for both your conversation history and your code state. When triggered, it opens an interactive menu that allows you to jump back to any previous prompt in the session, effectively acting as a "undo" button for AI-driven development. You can choose to restore only the conversation (useful for refining instructions without losing current file edits), restore only the code (to revert specific file changes while keeping the chat context), or restore both to a verified checkpoint. This shortcut is particularly valuable for experimental coding because it automatically creates local checkpoints before every change, allowing you to quickly discard an entire branch of reasoning or a failed implementation without manually restoring individual files or managing Git commits.

Visit the following resources to learn more:

- [@official@Interactive mode - Claude Code Docs](https://code.claude.com/docs/en/interactive-mode#reverse-search-with-ctrl+r)
- [@official@Checkpointing - Claude Code Docs](https://code.claude.com/docs/en/checkpointing)
- [@article@Your Time Machine for Code: Double Esc to Rewind When Things Go Wrong - DEV Community](https://dev.to/rajeshroyal/your-time-machine-for-code-double-esc-to-rewind-when-things-go-wrong-53pa)