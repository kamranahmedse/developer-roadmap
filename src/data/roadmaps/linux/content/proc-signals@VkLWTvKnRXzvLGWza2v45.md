# Process Signals

Process signals are communication mechanisms in Linux that notify processes of synchronous or asynchronous events. Common signals include SIGINT, SIGSTOP, SIGKILL for interrupting, pausing, or terminating processes. Example: `kill -SIGSTOP 12345` suspends process with PID 12345 until SIGCONT is received. Essential for comprehensive process management and resource allocation.