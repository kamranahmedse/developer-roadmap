# Use subagents and hooks

In Claude Code, Subagents and Hooks are powerful architectural tools that manage the context window by practicing "selective attention," ensuring the main conversation stays lean while specialized tasks remain high-precision. Subagents act as isolated "expert bubbles" that run in their own independent context windows with restricted toolsets; they can ingest thousands of tokens of raw logs or documentation, returning only a concise final summary to your main session. This prevents your primary conversation from becoming "bloated" with noisy intermediate data, which maintains Claude's reasoning quality and reduces per-turn costs. Hooks, on the other hand, provide a deterministic way to inject or prune context at key lifecycle moments.

Visit the following resources to learn more:

- [@official@Claude Code Subagents: Complete Guide to Multi-Agent Architecture](https://wmedia.es/en/writing/claude-code-subagents-guide-ai)
- [@official@Automate workflows with hooks](https://code.claude.com/docs/en/hooks-guide)
- [@article@Delegate verbose operations to subagents](https://code.claude.com/docs/en/costs#delegate-verbose-operations-to-subagents)