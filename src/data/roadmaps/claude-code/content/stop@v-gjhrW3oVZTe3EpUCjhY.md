# Stop

The `Stop` hook is a final-stage lifecycle event that triggers when Claude Code believes it has finished its entire response and is about to return control to the user. Unlike `PostToolUse`, which fires after every single file edit or command, the `Stop` hook only runs once at the very end of the interaction "turn."