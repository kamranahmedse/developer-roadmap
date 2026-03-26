# Skill Best Practices

When configuring Claude Code skills, the primary best practice is to optimize for discoverability and context efficiency by using precise YAML frontmatter and "lazy loading." Your skill's `description` should act as a clear semantic trigger, using specific keywords that help Claude identify exactly when to activate the expert instructions without bloating the context window of every conversation. Structure the `SKILL.md` with a narrow, modular focus rather than creating a "Swiss Army Knife" skill.

Visit the following resources to learn more:

- [@official@Create Skills](https://code.claude.com/docs/en/best-practices#create-skills)
- [@official@The Complete Guide to Building Skills for Claude](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf)
- [@article@A useful cheatsheet for understanding Claude Skills](https://www.reddit.com/r/ClaudeAI/comments/1qbpe91/a_useful_cheatsheet_for_understanding_claude/)