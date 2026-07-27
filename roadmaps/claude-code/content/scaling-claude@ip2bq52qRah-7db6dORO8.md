# Scaling Claude Code

Claude Code offers several ways to parallelize work across multiple agents or sessions: subagents, agent view, agent teams, and worktrees. Subagents are delegated workers that handle a side task within their own context and return a summary, keeping the main conversation clean. Agent view lets you dispatch independent sessions to the background and monitor them from a single screen. Agent teams coordinate multiple sessions through a shared task list and inter-agent messaging, managed by a lead agent. Worktrees isolate parallel sessions into separate git checkouts so they never conflict over the same files.

Visit the following resources to learn more:

- [@official@Run agents in parallel](https://code.claude.com/docs/en/agents)
- [@official@Agent view](https://code.claude.com/docs/en/agent-view)