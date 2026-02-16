# Prompt Caching

Prompt caching in Claude Code is a performance-optimizing feature that stores the frequently used "prefixes" of your conversations—such as your entire codebase state, system instructions, and tool definitions—so they don't have to be reprocessed from scratch with every new message. In an agentic environment where Claude often re-reads your files multiple times to maintain context, caching acts as a "checkpoint" system: while the initial write to the cache carries a slight premium, every subsequent interaction that reuses that prefix receives a 90% discount on input tokens and up to an 85% reduction in latency. Claude Code handles this automatically by placing "cache breakpoints" at strategic points in the prompt (like after your CLAUDE.md and project structure), ensuring that even as your conversation grows, the "static" foundation of your project remains instantly accessible and cost-effective.

Visit the following resources to learn more:

- [@official@Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- [@official@Prompt caching configuration](https://code.claude.com/docs/en/model-config#prompt-caching-configuration)
- [@article@Unlocking Efficiency: A Practical Guide to Claude Prompt Caching](https://medium.com/@mcraddock/unlocking-efficiency-a-practical-guide-to-claude-prompt-caching-3185805c0eef)
