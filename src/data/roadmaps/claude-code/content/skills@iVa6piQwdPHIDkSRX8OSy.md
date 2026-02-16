# Skills

Claude Code skills are modular packages of instructions, scripts, and assets that teach the AI assistant how to perform specific, repeatable workflows. Each skill is stored in a dedicated folder containing a mandatory [SKILL.md](http://SKILL.md) file, which uses YAML frontmatter to define its name and a description that the AI uses to automatically discover and load the skill when relevant. By bundling domain-specific knowledge—such as corporate brand guidelines, database schemas, or complex deployment sequences—skills prevent "context bloat" because the full instructions only load into the conversation when the task at hand requires them. They can be invoked manually using slash commands like /review or /deploy, and they often include executable bash scripts or templates that ensure the AI follows a disciplined, verified process rather than guessing how to complete a task.

Visit the following resources to learn more:

- [@course@Agent Skills with Anthropic](https://www.deeplearning.ai/short-courses/agent-skills-with-anthropic/)
- [@official@Extend Claude with skills](https://code.claude.com/docs/en/skills)
- [@official@The Complete Guide to Building Skills for Claude](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf?hsLang=en)
- [@opensource@skills](https://github.com/anthropics/skills)
- [@article@Inside Claude Skills: Custom Modules That Extend Claude](https://www.datacamp.com/tutorial/claude-skills)
- [@video@Claude Code Skills & skills.sh - Crash Course](https://www.youtube.com/watch?v=rcRS8-7OgBo)
- [@video@Claude Code Skills are INSANE (and you’re not using them correctly) - YouTube](https://www.youtube.com/watch?v=thxXGxYIwUI)