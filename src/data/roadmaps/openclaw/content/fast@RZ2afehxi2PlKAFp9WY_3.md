# /fast

`/fast` is a directive that toggles fast mode for the current session. It takes `on`, `off`, or `status` as arguments. Fast mode maps to different provider-level behaviors depending on your model — for example, `service_tier=priority` on OpenAI or `service_tier=auto` on Anthropic. Omitting the argument shows the current effective fast-mode state.

Visit the following resources to learn more:

- [@official@Fast mode (/fast)](https://docs.openclaw.ai/tools/thinking#fast-mode-/fast)
- [@official@Slash Commands](https://docs.openclaw.ai/tools/slash-commands)