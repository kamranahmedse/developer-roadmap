# Proc Signals under Process Management

In Linux, process management is a fundamental part of the system which involves creating, scheduling, terminating and coordinating the execution of processes. One crucial aspect of this is proc signals or process signals.

Process signals are a form of communication mechanism in Unix and Linux systems. They provide a means to notify a process of synchronous or asynchronous events. There are a variety of signals like SIGINT, SIGSTOP, SIGKILL, etc. available which can be sent to a running process to interrupt, pause or terminate it.

For instance, to send a SIGSTOP signal to a process with a PID of 12345 you would use `kill` command in terminal as follows:

```bash
kill -SIGSTOP 12345
```
This will suspend the execution of the process until a SIGCONT signal is received.

Understanding proc signals is essential for comprehensive process management and resource allocation in Linux.