# Creating Custom Skills

To create a custom skill in Claude Code, you must establish a new folder within the `.claude/skills/` directory containing a `SKILL.md` file that defines the skill's identity and logic. This file begins with a YAML frontmatter block containing a unique `name` and a detailed `description`, which Claude uses as a trigger to "know" when to activate the skill, and can include an optional `disable-model-invocation: true` flag if you want the skill to run as a manual, deterministic workflow rather than an autonomous one.

Visit the following resources to learn more:

- [@course@Agent Skills with Anthropic](https://www.deeplearning.ai/short-courses/agent-skills-with-anthropic/)
- [@official@Extend Claude with skills](https://code.claude.com/docs/en/skills#extend-claude-with-skills)
- [@official@How to create custom Skills](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)
- [@article@Build Your First Claude Code Agent Skill: A Simple Project Memory System That Saves Hours](https://pub.spillwave.com/build-your-first-claude-code-skill-a-simple-project-memory-system-that-saves-hours-1d13f21aff9e)
- [@video@Claude Code Skills & skills.sh - Crash Course](https://www.youtube.com/watch?v=rcRS8-7OgBo)