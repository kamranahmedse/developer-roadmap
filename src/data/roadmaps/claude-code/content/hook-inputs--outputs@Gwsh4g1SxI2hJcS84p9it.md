# Hook Inputs & Outputs

In Claude Code, hooks communicate via a standardized JSON interface: Inputs are passed to the hook via `stdin`, and Outputs are returned via `stdout` to influence the agent's next move. The input payload typically includes a `context` object containing session metadata and event-specific data, such as the `tool` name and its arguments (e.g., the exact code being written or command being run). To respond, your hook must return a JSON object. For Command hooks, an exit code of `0` allows the action to proceed, while an exit code of `2` paired with a "reason" string in the output JSON blocks the tool and reports the failure back to Claude.

Visit the following resources to learn more:

- [@official@Hook Inputs & Outputs](https://code.claude.com/docs/en/hooks#hook-input-and-output)