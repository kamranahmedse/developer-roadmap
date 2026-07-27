# Sessions

A session is the conversation context tied to a specific agent and chat source. Direct messages share one session by default, but you can isolate each sender into their own context, strongly recommended if more than one person can message your agent. All session state is owned by the Gateway and maintained automatically through pruning and entry caps to keep the store bounded over time.

Visit the following resources to learn more:

- [@official@Session Management](https://docs.openclaw.ai/concepts/session)
- [@official@Session Pruning](https://docs.openclaw.ai/concepts/session-pruning)
- [@article@OpenClaw Session Management Explained](https://www.dench.com/blog/openclaw-session-management)