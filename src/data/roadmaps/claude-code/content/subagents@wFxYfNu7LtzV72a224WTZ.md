# Subagents

Subagents are specialized AI assistants that function as independent "team members" to handle focused tasks on behalf of the main agent. Each subagent operates within its own isolated context window, meaning it starts with a clean slate and does not clutter your primary conversation with large amounts of intermediate research or technical logs. They are typically defined by a markdown file in the `.claude/agents/` directory, where you specify their unique system prompt, expertise, and restricted tool access—for example, a "researcher" might have access to web search and file reading but be barred from editing code. You can manage them using the `/agents` command to create, edit, or manually invoke a specialist like a "debugger" or "reviewer," though the main agent can also automatically delegate tasks to them if their description matches a complex sub-goal.

Visit the following resources to learn more:

- [@official@Create custom subagents - Claude Code Docs](https://code.claude.com/docs/en/sub-agents)
- [@video@Stop Using Claude Code Like This (Use Sub-Agents Instead) -](https://www.youtube.com/watch?v=P60LqQg1RH8)
- [@video@Claude Code NEW Sub Agents in 7 Minutes](https://www.youtube.com/watch?v=DNGxMX7ym44)
- [@video@Claude Code Tutorial #8 - Subagents](https://www.youtube.com/watch?v=Phr7vBx9yFQ)