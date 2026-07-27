# Gateway

The Gateway is the single always-on process that handles routing, the control plane, and all channel connections. It runs on a single multiplexed port that serves the WebSocket control and RPC interface, HTTP APIs, the Control UI, and hooks. By default, it binds to localhost and requires an auth token before accepting any connections.

Visit the following resources to learn more:

- [@official@Gateway Runbook](https://docs.openclaw.ai/gateway)
- [@article@OpenClaw Gateway: Setup, Start/Stop Commands & Remote Mode](https://www.meta-intelligence.tech/en/insight-openclaw-gateway)