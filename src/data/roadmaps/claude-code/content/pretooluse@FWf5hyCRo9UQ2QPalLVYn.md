# PreToolUse

The `PreToolUse` hook is a validation gate that executes immediately after Claude decides to use a tool (like writing a file or running a shell command) but before that tool actually runs. It is primarily used for security, policy enforcement, and input sanitization, acting as a final check to ensure the AI's proposed action is safe and correct.