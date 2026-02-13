# claude -r

The `claude -r` command (short for --resume) allows you to restart a specific past conversation by providing its unique Session ID. Unlike the `-c` flag, which automatically opens the very last session you had, `-r` gives you the precision to jump back to any session from your history, ensuring you can continue a specific line of work without losing context or previous tool outputs. If you run the command without an ID—simply typing `claude --resume` —it opens an interactive session picker where you can scroll through a list of recent conversations, see their titles, and choose the one you want to reactivate.

Visit the following resources to learn more:

- [@official@CLI commands](https://code.claude.com/docs/en/cli-reference#cli-commands)
- [@official@Resume or fork sessions](https://code.claude.com/docs/en/how-claude-code-works#resume-or-fork-sessions)