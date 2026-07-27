# PreToolUse

The `PreToolUse` hook is a validation gate that executes immediately after Claude decides to use a tool (like writing a file or running a shell command) but before that tool actually runs. It is primarily used for security, policy enforcement, and input sanitization, acting as a final check to ensure the AI's proposed action is safe and correct.

Visit the following resources to learn more:

- [@official@Hooks reference](https://code.claude.com/docs/en/hooks)
- [@official@Automate workflows with hooks](https://code.claude.com/docs/en/hooks-guide)
- [@article@Secure Your Claude Skills with Custom PreToolUse Hooks](https://egghead.io/secure-your-claude-skills-with-custom-pre-tool-use-hooks~dhqko)