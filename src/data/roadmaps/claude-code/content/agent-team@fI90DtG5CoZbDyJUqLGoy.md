# Agent Team

Agent Teams are an experimental multi-agent orchestration feature in Claude Code that allows you to coordinate multiple AI instances working in parallel on a single project. Unlike standard subagents, which operate in silos and only report back to a parent, Agent Teams function as a collaborative network where a designated Team Lead manages a shared task list and delegates work to Teammates who can message each other directly to share findings or debate solutions. This approach is specifically designed to handle "wide" tasks—such as simultaneous cross-layer feature development (frontend, backend, and tests) or deep debugging where different agents test competing hypotheses—by giving each agent its own independent context window to prevent token bloat in the main session.

Visit the following resources to learn more:

- [@official@Orchestrate teams of Claude Code sessions](https://code.claude.com/docs/en/agent-teams)
- [@official@Building a C compiler with a team of parallel Claudes](https://www.anthropic.com/engineering/building-c-compiler)
- [@article@I Tried (New) Claude Code Agent Teams (And Discovered New Way to Swarm)](https://medium.com/@joe.njenga/i-tried-new-claude-code-agent-teams-and-discovered-new-way-to-swarm-28a6cd72adb8)
- [@article@How to Set Up Claude Code Agent Teams (Full Walkthrough + What Actually Changed)](https://www.reddit.com/r/ClaudeCode/comments/1qz8tyy/how_to_set_up_claude_code_agent_teams_full/)
- [@video@Claude Code's Agent Teams Are Insane - Multiple AI Agents Coding Together in Real Time](https://www.youtube.com/watch?v=-1K_ZWDKpU0)
- [@video@How to Use Claude Code Agent Teams in 13 Mins (Opus 4.6)](https://www.youtube.com/watch?v=y9IYtWELMHw)