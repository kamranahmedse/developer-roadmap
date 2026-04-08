# Security Best Practices

When running Open Claw locally, bind the Gateway to localhost only so it is never exposed directly to the internet, set a strong, randomly generated auth token, and never hardcode API keys in config files — use environment variables instead. Run the process as a non-root user, keep your sender allowlist minimal, and enable device pairing so unknown devices cannot connect. Be cautious about prompt injection since the agent can read external content like emails and web pages. Run `openclaw security audit --deep` after any configuration change, keep Open Claw updated regularly, and rotate all credentials immediately if you suspect a breach.

Visit the following resources to learn more:

- [@official@Security](https://docs.openclaw.ai/gateway/security)
- [@official@Threat Model](https://docs.openclaw.ai/security/THREAT-MODEL-ATLAS)
- [@article@OpenClaw security: A checklist for securing a local AI agent](https://www.hostinger.com/ca/tutorials/openclaw-security)
- [@video@DO NOT use a VPS for OpenClaw (major warning)](https://www.youtube.com/watch?v=ev4iiGXlnh0)