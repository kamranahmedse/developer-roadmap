# Killing Processes

The `kill` command terminates processes in Linux by sending signals to specific Process IDs (PIDs). Use `kill [signal] PID` to terminate processes manually. Different signals provide various termination methods - SIGTERM for graceful shutdown, SIGKILL for forced termination. Process termination is essential for managing unresponsive or unwanted processes.

'Kill' in Linux is a built-in command that is used to terminate processes manually. You can use the `kill` command to send a specific signal to a process. When we use the `kill` command, we basically request a process to stop, pause, or terminate.

Here's a basic illustration on how to use the `kill` command in Linux:

```bash
kill [signal or option] PID(s)
```

In practice, you would identify the Process ID (PID) of the process you want to terminate and replace PID(s) in the above command. The signal or option part is optional, but very powerful allowing for specific termination actions.

Visit the following resource to learn more:

- [@article@Killing Processes](https://linuxjourney.com/lesson/killing-processes)
