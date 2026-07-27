# Agents

An agent in Open Claw is a fully isolated unit with its own workspace folder containing its personality and configuration files, its own state directory that holds auth profiles and the model registry, and its own session store that keeps the full conversation history separate from every other agent. Because auth profiles are scoped per-agent, credentials for one agent are never automatically shared with another, which means you can run a personal agent on your WhatsApp number and a work agent on a separate account on the same Gateway without any risk of their sessions, memories, or API keys crossing over.

Visit the following resources to learn more:

- [@official@Agent Runtime](https://docs.openclaw.ai/concepts/agent)
- [@opensource@🦞 Awesome OpenClaw Agents](https://github.com/mergisi/awesome-openclaw-agents)