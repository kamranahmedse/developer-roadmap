# Model Configuration

Claude Code offers a highly flexible model configuration hierarchy that allows you to balance speed, cost, and reasoning depth across different tasks. You can switch models instantly during an active session using the `/model` command, specify a model at startup with the `--model` flag, or set a permanent default in your `~/.claude/settings.json` file using the `model` key. The system supports semantic aliases like sonnet (default for daily coding), haiku (fast and efficient), and opus (high-reasoning for complex architecture), as well as a specialized `opusplan` mode that intelligently uses Opus for strategic planning before automatically switching to Sonnet for the actual code implementation. Furthermore, you can fine-tune performance on supported models by adjusting the `effortLevel` (low, medium, or high), which controls how much "thinking time" Claude allocates to solving difficult logic puzzles versus generating rapid responses.

Visit the following resources to learn more:

- [@official@Model configuration](https://code.claude.com/docs/en/model-config#model-configuration)
- [@article@A complete guide to model configuration in Claude Code](https://www.eesel.ai/blog/model-configuration-claude-code)