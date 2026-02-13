# Use /compact and /clear

Regularly using `/compact` and `/clear` is the most effective way to prevent "context rot" and manage spiraling API costs while working with Claude Code. Because Claude re-processes your entire conversation history with every new message, a session that has accumulated thousands of lines of terminal output and file diffs will eventually become expensive, slow, and prone to "forgetting" early instructions. Using `/compact` allows you to summarize long research or debugging threads into a lean set of key findings, effectively "zipping" the conversation so you can continue without losing essential progress. In contrast, `/clear` is vital when switching to an unrelated task; it wipes the current history to provide a clean slate.

Visit the following resources to learn more:

- [@article@Claude Code Compaction](https://stevekinney.com/courses/ai-development/claude-code-compaction)
- [@article@Claude Code Best Practices: Memory Management](https://medium.com/@codecentrevibe/claude-code-best-practices-memory-management-7bc291a87215)