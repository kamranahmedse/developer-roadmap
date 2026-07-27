# How OpenClaw Works

Open Claw runs a single long-lived Gateway that owns all messaging surfaces and exposes a typed WebSocket API for control-plane clients like the macOS app, CLI, and web UI. When a message arrives, the Gateway routes it to the appropriate agent, which then runs through a full loop of context assembly, model inference, and tool execution before streaming a reply back.

Visit the following resources to learn more:

- [@official@OpenClaw Overview](https://docs.openclaw.ai/)
- [@official@Gateway Architecture](https://docs.openclaw.ai/concepts/architecture)
- [@article@OpenClaw Architecture, Explained: How It Works](https://ppaolo.substack.com/p/openclaw-system-architecture-overview)
- [@video@How OpenClaw Works: The Architecture Behind the 'Magic'](https://www.youtube.com/watch?v=CAbrRTu5xcw&t=75s)