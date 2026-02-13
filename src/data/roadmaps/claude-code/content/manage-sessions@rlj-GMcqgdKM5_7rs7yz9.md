# Manage Sessions

Claude Code manages sessions through a persistent, local architecture where every interaction is stored in a unique session file, allowing you to resume work using terminal flags like `claude --continue` (for the most recent thread) or `claude --resume` (to open an interactive picker of past conversations). While each new session initializes with a fresh context window to optimize token usage and avoid irrelevance, Claude automatically snapshots affected files before any modification, enabling you to use the `/rewind` command to revert both code and conversation history to a previous "checkpoint." If you want to explore a different implementation path without altering your original work, you can use `claude --continue --fork-session` to branch into a new session ID that inherits all current context.

Visit the following resources to learn more:

- [@official@Work with sessions](https://code.claude.com/docs/en/how-claude-code-works#work-with-sessions)
- [@article@Claude Code Session Management | Developing with AI Tools | Steve Kinney](https://stevekinney.com/courses/ai-development/claude-code-session-management)