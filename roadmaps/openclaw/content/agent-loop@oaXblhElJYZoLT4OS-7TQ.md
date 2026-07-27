# Agent Loop

When Open Claw receives a message, it runs a full agent loop rather than returning a single response. The loop validates the message, resolves the model, assembles the system prompt from skills and context files, and then sends everything to the model for inference. If the model decides to call a tool, like running a command, reading a file, or searching the web, the loop executes it, feeds the result back to the model, and continues until no more tool calls are needed and a final reply is ready. If the session gets too long for the context window, compaction kicks in automatically before retrying.

Visit the following resources to learn more:

- [@article@Agent Loop](https://docs.openclaw.ai/concepts/agent-loop)