# SessionEnd

The `SessionEnd` hook is a teardown lifecycle event that triggers when you exit Claude Code or terminate a session. While `SessionStart` is for preparation, `SessionEnd` is your dedicated window for cleanup, archiving, and final reporting. It ensures that your environment is left in a clean state and that any important session metrics are captured before the process fully closes.