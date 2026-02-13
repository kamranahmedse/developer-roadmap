# Rewind Conversations

To rewind a conversation in Claude Code, you can use the `/rewind` slash command or the `Esc + Esc` keyboard shortcut to open the interactive checkpoint menu. This feature leverages the tool's automatic snapshotting, which creates a restore point for every user prompt and file modification throughout your session. Once the menu is open, you can scroll through your previous inputs and select a specific point to restore code and conversation, which reverts both your files and the chat history; restore conversation only, which keeps your current code changes but wipes later chat turns; or summarize from here, which distills all subsequent interactions into a compact summary to reclaim context window space. Because rewinding can fork your conversation into parallel timelines, it is most effective for "undoing" AI mistakes or exploring alternative implementation paths without manually reverting file edits.

Visit the following resources to learn more:

- [@official@Rewind and summarize](https://code.claude.com/docs/en/checkpointing#rewind-and-summarize)
- [@official@Rewind with checkpoints](https://code.claude.com/docs/en/best-practices#rewind-with-checkpoints)
- [@article@Claude Code Checkpoints: 5 Patterns for Disaster Recovery | Medium](https://alirezarezvani.medium.com/claude-code-rewind-5-patterns-after-a-3-hour-disaster-a9de9bce0372)