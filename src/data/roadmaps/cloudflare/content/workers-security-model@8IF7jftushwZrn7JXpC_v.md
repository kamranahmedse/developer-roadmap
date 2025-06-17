# Workers Security Model

Cloudflare Workers operate within a secure, isolated environment. The Workers runtime enforces strict security boundaries, preventing Workers from accessing sensitive data or interfering with other processes. Workers have limited access to the outside world and must explicitly request resources. Cloudflare's global network provides inherent DDoS protection and mitigates common web vulnerabilities. This secure execution environment ensures that Workers can safely process requests without compromising the overall security of the platform.

Visit the following resources to learn more:

- [@official@Security Model · Cloudflare](https://developers.cloudflare.com/workers/reference/security-model/)
- [@official@Workers RPC — Visibility and Security Model - Cloudflare Docs](https://developers.cloudflare.com/workers/runtime-apis/rpc/visibility/)