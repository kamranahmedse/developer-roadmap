# Skills

In Claude Code, Skills are self-contained folders of "expert knowledge" and repeatable workflows that Claude loads dynamically into its context only when the task requires it. Each skill is anchored by a `SKILL.md` file containing YAML frontmatter—which helps Claude identify the skill's purpose without bloating the context window—and a body of specific instructions, often accompanied by supporting scripts, assets, or reference documents. While `CLAUDE.md` provides permanent project context, skills are designed for progressive disclosure, acting as on-demand "expert modes" for specialized actions like auditing security, formatting complex documentation, or orchestrating multi-step deployment pipelines. You can trigger them manually using a slash command (e.g., `/deploy`) or let Claude autonomously invoke them when it detects a match with a skill's description, ensuring the AI maintains high precision and follows "non-negotiable" procedures without the overhead of keeping every rule in its immediate memory at once.

Visit the following resources to learn more:

- [@course@Agent Skills with Anthropic](https://www.deeplearning.ai/short-courses/agent-skills-with-anthropic/)
- [@official@Extend Claude with skills](https://code.claude.com/docs/en/skills#extend-claude-with-skills)
- [@official@The Complete Guide to Building Skills for Claude](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf?hsLang=en)
- [@opensource@skill](https://github.com/anthropics/skills)
- [@article@Claude Code Skills — Equipping Your Claude Code Agents with more Superpowers](https://medium.com/@ooi_yee_fei/claude-code-skills-superpowering-claude-code-agents-a42b44a58ae2)
- [@video@Claude Code Skills & skills.sh - Crash Course](https://www.youtube.com/watch?v=rcRS8-7OgBo)
- [@video@Stop Using Claude Code Without Skills](https://www.youtube.com/watch?v=vIUJ4Hd7be0)
- [@video@Claude Code Skills are INSANE (and you’re not using them correctly)](https://www.youtube.com/watch?v=thxXGxYIwUI)