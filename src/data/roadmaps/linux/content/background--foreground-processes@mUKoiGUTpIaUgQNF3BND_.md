# Background and Foreground Processes

Linux processes run in foreground (fg) taking direct user input or background (bg) running independently. Start background processes with `command &` or use `Ctrl+Z` then `bg` to pause and resume in background. Use `fg` to bring background processes to foreground. These job control commands enable managing multiple tasks from a single terminal efficiently.

Here's how you can send a running process to background:

```bash
command &
```

Or if a process is already running:

```bash
CTRL + Z       # This will pause the process
bg             # This resumes the paused process in the background
```

And to bring it back to the foreground:

```bash
fg
``` 

These commands, `bg` and `fg` are part of job control in Unix-like operating systems, which lets you manage multiple tasks simultaneously from a single terminal.