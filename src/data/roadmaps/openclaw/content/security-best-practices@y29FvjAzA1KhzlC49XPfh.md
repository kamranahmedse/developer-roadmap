# Security Best Practices

Use a local machine setup only for single-user personal use. Bind the Gateway to localhost so it is never exposed to the internet, set a strong randomly generated auth token, and store all API keys in environment variables rather than config files. Run Open Claw as a non-root user, keep your sender allowlist to just yourself, and enable device pairing so unknown devices cannot connect. Run `openclaw security audit --deep` after any configuration change and keep Open Claw updated regularly.

Visit the following resources to learn more:

- [@official@Security](https://docs.openclaw.ai/gateway/security)
- [@official@Gateway Runbook](https://docs.openclaw.ai/gateway)
- [@article@OpenClaw security best practices guide](https://lumadock.com/tutorials/openclaw-security-best-practices-guide)