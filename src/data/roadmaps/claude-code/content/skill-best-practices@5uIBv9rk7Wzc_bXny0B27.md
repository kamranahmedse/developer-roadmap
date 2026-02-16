# Skill Best Practices

When configuring Claude Code skills, the primary best practice is to optimize for discoverability and context efficiency by using precise YAML frontmatter and "lazy loading." Your skill's `description` should act as a clear semantic trigger, using specific keywords that help Claude identify exactly when to activate the expert instructions without bloating the context window of every conversation. Structure the `SKILL.md` with a narrow, modular focus rather than creating a "Swiss Army Knife" skill; if a workflow has non-negotiable side effects, use `disable-model-invocation: true` to ensure it only runs when manually triggered via a slash command. Additionally, leverage argument placeholders (like `$ARGUMENTS`) to make your skills reusable across different files, and store them in the project’s `.claude/skills/` directory so they are version-controlled and shared with your team. Finally, keep skill instructions deterministic by providing step-by-step tool sequences, which ensure Claude follows your project’s "golden path" for complex tasks like deployments or security audits.

Visit the following resources to learn more:

- [@official@Create skills](https://code.claude.com/docs/en/best-practices#create-skills)
- [@official@Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [@official@The Complete Guide to Building Skills for Claude](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf?hsLang=en)
- [@article@A useful cheatsheet for understanding Claude Skills](https://www.reddit.com/r/ClaudeAI/comments/1qbpe91/a_useful_cheatsheet_for_understanding_claude/)
- [@article@Writing Claude Skills That Actually Work: A Guide to What Works (And What Doesn’t)](https://medium.com/@creativeaininja/writing-claude-skills-that-actually-work-a-guide-to-what-works-and-what-doesnt-2dfcd9593106)
- [@video@Claude Code Skills are INSANE (and you’re not using them correctly)](https://www.youtube.com/watch?v=thxXGxYIwUI)
