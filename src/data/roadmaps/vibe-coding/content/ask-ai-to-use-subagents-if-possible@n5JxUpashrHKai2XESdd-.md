# Ask AI to use subagents if possible

Some advanced AI tools support the ability to spin up subagents — specialized agents that handle specific tasks like browsing the web, running code, managing files, or searching through documentation. Rather than one AI trying to do everything in a single long conversation, subagents allow the work to be broken up and delegated, with each agent focused on one specific job. This matters a lot when it comes to context management. In a long single conversation, the AI has to keep track of everything that has been said, and as the conversation grows, the context window fills up, causing the AI to lose focus and make more mistakes. Subagents solve this by each working in their own isolated context — they only receive the information relevant to their specific task, which keeps them sharp, reduces token usage, and ultimately saves you money.

Visit the following resources to learn more:

- [@article@Agents, Subagents, and Multi Agents: What They Are and When to Use Them](https://dev.to/goose_oss/agents-subagents-and-multi-agents-what-they-are-and-when-to-use-them-39na)
- [@article@Create custom subagents - Claude Code](https://code.claude.com/docs/en/sub-agents)