# Permission Modes

Claude Code features several permission modes that define the balance between autonomy and safety during your session, ranging from Plan mode, which restricts Claude to a read-only state for exploration and strategy without any tool execution, to BypassPermissions mode (often called "YOLO mode"), which grants the AI full autonomy to run any command or edit any file without interruption. Between these extremes, Default mode maintains a "human-in-the-loop" approach by requiring manual approval for initial tool uses or sensitive bash commands, while AcceptEdits mode (displayed as Delegate mode in some CLI versions) streamlines development by auto-approving file modifications while still prompting you for potentially destructive terminal actions. You can cycle through these modes in real-time by pressing `Shift+Tab` or set a starting point using the `—permission-mode` flag, ensuring you can scale the AI's power to match your trust level in a specific project or environment.

Visit the following resources to learn more:

- [@official@Permission modes](https://code.claude.com/docs/en/permissions#permission-modes)
- [@article@A complete guide to Claude Code permissions](https://www.eesel.ai/blog/claude-code-permissions)
- [@article@3 Things You Must Know About /permissions in Claude Code](https://wmedia.es/en/tips/claude-code-permissions-3-key-concepts)
- [@article@Claude Code on Loop: The Ultimate YOLO Mode](https://mfyz.com/claude-code-on-loop-autonomous-ai-coding/)
- [@video@Claude Code Tutorial #4 - Tools & Permissions](https://www.youtube.com/watch?v=TU0ZcDFq0e0)