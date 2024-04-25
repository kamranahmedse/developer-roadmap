# Managing bg (background) and fg (foreground) Processes 

In Linux environment, a process can be run in either the foreground (fg) or the background (bg). The foreground process takes input directly from the user, displaying output and errors to the user's terminal. On the other hand, a background process runs independently of the user's actions, freeing up the terminal for other tasks.

Typically, a process starts in the foreground. However, you can send it to the background by appending an ampersand (&) to the command or by using the `bg` command. Conversely, the `fg` command brings a background process to the foreground.

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