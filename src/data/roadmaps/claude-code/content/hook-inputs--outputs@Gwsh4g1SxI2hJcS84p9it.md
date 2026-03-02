# Hook Inputs & Outputs

Hooks communicate via a standardized JSON interface: Inputs are passed to the hook via `stdin`, and Outputs are returned via `stdout` to influence the agent's next move. The input payload typically includes a `context` object containing session metadata and event-specific data, such as the `tool` name and its arguments (e.g., the exact code being written or command being run). To respond, your hook must return a JSON object.

Visit the following resources to learn more:

- [@official@Hook Inputs & Outputs](https://code.claude.com/docs/en/hooks#hook-input-and-output)