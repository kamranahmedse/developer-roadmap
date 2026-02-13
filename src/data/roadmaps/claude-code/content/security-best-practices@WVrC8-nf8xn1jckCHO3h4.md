# Security Best Practices

Security is the most critical pillar of using Claude Code because giving an AI agent the ability to execute terminal commands and modify files creates a powerful "intern with root access" who is susceptible to prompt injection and data exfiltration. Since Claude can unknowingly ingest malicious instructions from untrusted files, READMEs, or even web content—potentially leading to accidental database resets or the leaking of `.env` secrets—you must implement a zero-trust defense-in-depth strategy. This involves layering OS-level sandboxing to isolate the AI's filesystem reach, enforcing strict permission tiers (Deny for sensitive keys, Ask for destructive commands like rm or git push, and Allow only for read-only tools), and using audit logs to monitor for unusual behavior.

Visit the following resources to learn more:

- [@official@Security](https://code.claude.com/docs/en/security#security)
- [@official@Sandboxing](https://code.claude.com/docs/en/sandboxing)
- [@official@Beyond permission prompts: making Claude Code more secure and autonomous](https://www.anthropic.com/engineering/claude-code-sandboxing)
- [@article@A deep dive into security for Claude Code in 2025](https://www.eesel.ai/blog/security-claude-code)