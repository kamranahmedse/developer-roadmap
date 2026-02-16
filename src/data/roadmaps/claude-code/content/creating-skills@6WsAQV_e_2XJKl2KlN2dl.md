# Creating Custom Skills

To create a custom skill in Claude Code, you must establish a new folder within the `.claude/skills/` directory containing a `SKILL.md` file that defines the skill's identity and logic. This file begins with a YAML frontmatter block containing a unique `name` and a detailed `description`—which Claude uses as a trigger to "know" when to activate the skill—and can include an optional `disable-model-invocation: true` flag if you want the skill to run as a manual, deterministic workflow rather than an autonomous one. The body of the Markdown file acts as a specialized system prompt, where you provide step-by-step instructions, define argument placeholders like `$ARGUMENTS`, and list the specific tool sequences Claude should follow to complete the task. By organizing your skill this way, you allow Claude to maintain a lean context window, loading these expert instructions only when you explicitly call them via a slash command (e.g., `/my-skill-name`) or when Claude Code detects a task that matches the skill’s documented purpose.

Visit the following resources to learn more:

- [@course@Agent Skills with Anthropic](https://www.deeplearning.ai/short-courses/agent-skills-with-anthropic/)
- [@official@Extend Claude with skills](https://code.claude.com/docs/en/skills#extend-claude-with-skills)
- [@official@How to create custom Skills](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)
- [@article@Claude Code Skills — Equipping Your Claude Code Agents with more Superpowers](https://medium.com/@ooi_yee_fei/claude-code-skills-superpowering-claude-code-agents-a42b44a58ae2)
- [@article@Build Your First Claude Code Agent Skill: A Simple Project Memory System That Saves Hours](https://pub.spillwave.com/build-your-first-claude-code-skill-a-simple-project-memory-system-that-saves-hours-1d13f21aff9e)
- [@video@Claude Code Skills & skills.sh - Crash Course](https://www.youtube.com/watch?v=rcRS8-7OgBo)