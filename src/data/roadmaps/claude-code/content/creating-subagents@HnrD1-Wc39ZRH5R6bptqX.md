# Creating Subagents

To create a Subagent in Claude Code, you must define a specialized assistant within a Markdown file located in the `.claude/agents/` directory, using YAML frontmatter to specify its `name`, `description`, `model`, and a restricted set of `tools`. This isolated architecture is most effective when you need to delegate "high-context" tasks—like searching through dozens of files for architectural patterns or performing a security audit—because the subagent operates in its own context window, returning only a summarized result to your main session to save tokens and prevent "distraction." For best results, use a descriptive trigger in the YAML header so the main agent knows when to autonomously invoke it, and strictly limit the subagent's tools (e.g., providing only `Read` and `Grep` for a "Reviewer" agent) to create a safe, read-only layer of expertise. You can also optimize for cost by assigning Claude Haiku to simple subagent tasks like linting, while reserving sonnet for the main reasoning loop.

Visit the following resources to learn more:

- [@official@Create custom subagents](https://code.claude.com/docs/en/sub-agents)
- [@article@Building with Claude Code Subagents (My Beloved Minions)](https://medium.com/@ooi_yee_fei/building-with-claude-code-subagents-my-beloved-minions-b5a9a4318ba5)
- [@article@Sub Agents are a GAME CHANGER! Here is how I made some that work exceptionally well for me! : r/ClaudeCode](https://www.reddit.com/r/ClaudeCode/comments/1m8r9ra/sub_agents_are_a_game_changer_here_is_how_i_made/)
- [@video@Claude Code Tutorial #8 - Subagents](https://www.youtube.com/watch?v=Phr7vBx9yFQ)
- [@video@Master Claude Code Sub‑Agents in 10 Minutes](https://www.youtube.com/watch?v=mEt-i8FunG8)