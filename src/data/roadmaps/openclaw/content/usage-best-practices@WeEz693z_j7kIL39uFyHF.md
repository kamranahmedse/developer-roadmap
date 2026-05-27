# Usage Best Practices

To get the most out of Open Claw, run `openclaw doctor` regularly to catch configuration drift early, and always run openclaw `security audit --deep` after any config change. Keep your workspace files like [SOUL.md](http://SOUL.md), [USER.md](http://USER.md), and [MEMORY.md](http://MEMORY.md) up to date so the agent always has accurate context about who you are and how you want it to behave. Use `/new` at the start of a new topic rather than letting a single session grow indefinitely, which keeps the context window clean and triggers the session-memory hook to save what was discussed. Start with a minimal tool allowlist and only expand permissions when you have a specific need, and prefer Tailscale over open ports for any remote access to keep your Gateway secure without extra complexity.

Visit the following resources to learn more:

- [@official@CLI Reference](https://docs.openclaw.ai/cli)
- [@article@Vibe Coding Best Practices: How To Get Consistent Results](https://roadmap.sh/vibe-coding/best-practices)
- [@article@OpenClaw Cheatsheet](https://moltfounders.com/openclaw-mega-cheatsheet)