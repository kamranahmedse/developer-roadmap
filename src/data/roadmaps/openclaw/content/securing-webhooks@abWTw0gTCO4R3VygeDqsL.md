# Securing Webhooks

The Webhooks plugin ensures that each route is protected by shared-secret authentication, rate limiting, request size guards, and in-flight request limiting. Use a strong unique secret per route, store it as a SecretRef rather than inline plaintext, and bind each route to the narrowest session that fits the workflow. If a secret cannot be resolved at startup, the plugin skips that route and logs a warning instead of exposing a broken endpoint.

Visit the following resources to learn more:

- [@official@Webhooks Plugin](https://docs.openclaw.ai/plugins/webhooks)