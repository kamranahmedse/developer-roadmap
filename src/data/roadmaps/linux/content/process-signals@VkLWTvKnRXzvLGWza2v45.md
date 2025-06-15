# Process Signals

Process signals are communication mechanisms in Linux that notify processes of synchronous or asynchronous events. Common signals include SIGINT, SIGSTOP, SIGKILL for interrupting, pausing, or terminating processes. Use the `kill` command to send signals to processes by PID. Understanding signals is essential for effective process management and system control.

For instance, to send a SIGSTOP signal to a process with a PID of 12345 you would use `kill` command in terminal as follows:

```bash
kill -SIGSTOP 12345
```
This will suspend the execution of the process until a SIGCONT signal is received.

Understanding proc signals is essential for comprehensive process management and resource allocation in Linux.

Learn more from the following resource:

- [@article@Process signals](https://linuxjourney.com/lesson/process-signals)
