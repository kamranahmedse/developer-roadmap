# SessionStart

The `SessionStart` hook is a initialization lifecycle event that triggers at the very beginning of a Claude Code interaction. Unlike other hooks that react to specific user prompts or file edits, `SessionStart` is designed to bootstrap your environment and inject high-priority context before the first prompt is even processed.