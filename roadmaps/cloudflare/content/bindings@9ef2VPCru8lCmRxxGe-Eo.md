# Bindings

In Cloudflare Workers, Bindings are configurations that connect your Worker to external resources or services. These can include:

- **KV Namespaces:** Binding to a KV namespace allows the Worker to read and write data.
- **Durable Objects:** Bindings specify which Durable Object namespace the Worker can access.
- **Service Bindings:** Connecting to other Workers or Cloudflare services like Queues.
- **Secrets:** Storing sensitive data (API keys) securely.
- **Environment Variables:** Configuring environment-specific settings.

Bindings are defined in the `wrangler.toml` file and provide a secure and managed way for your Worker to interact with the outside world.

Visit the following resources to learn more:

- [@official@Bindings (env) · Cloudflare Workers](https://developers.cloudflare.com/workers/runtime-apis/bindings/)
- [@official@Workers Bindings · Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/configuration/bindings/)
- [@official@Configuration - Wrangler · Cloudflare Workers](https://developers.cloudflare.com/workers/wrangler/configuration/)