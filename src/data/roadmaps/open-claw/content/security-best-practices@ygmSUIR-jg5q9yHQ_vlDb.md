# Security Best Practices

On a VPS, never bind the Gateway to 0.0.0.0 — bind it to localhost and use a reverse proxy or Tailscale to control external access. Set a strong randomly generated auth token, use environment variables for all API keys, and run Open Claw as a non-root user. Keep your sender allowlist tight, enable device pairing, and start the agent in read-only mode before widening tool permissions deliberately. Keep both Open Claw and the OS updated regularly, run `openclaw security audit --deep` after any configuration change, and rotate all credentials immediately if anything looks suspicious.

Visit the following resources to learn more:

- [@official@Security](https://docs.openclaw.ai/gateway/security)
- [@official@Tailscale](https://docs.openclaw.ai/gateway/tailscale)
- [@official@Thread Model](https://docs.openclaw.ai/security/THREAT-MODEL-ATLAS)