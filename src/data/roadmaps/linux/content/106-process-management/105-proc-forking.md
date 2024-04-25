# Process Forking in Process Management

Process forking is a fundamental concept under process management in Linux systems. The term refers to the mechanism where a running process (parent process) can generate a copy of itself (child process), enabling concurrent execution of both processes. This is facilitated by the 'fork' system call. It is a prominent aspect in understanding the creation and control of processes in a Linux environment.

The child process created by fork is a nearly perfect copy of the parent process with exception to just a few values including the process ID and parent process ID. Any changes made in the child process does not affect the parent process, and vice versa.

Here's a basic code snippet of proc forking in C:

```c
#include<sys/types.h>
#include<unistd.h>
#include<stdio.h>

int main()
{
    pid_t child_pid;

    // Try creating a child process
    child_pid = fork();

    // If a child is successfully created
    if(child_pid >= 0)
    printf("Child created with PID: %d\n", child_pid);
    else
    printf("Fork failed\n");
    return 0;
}
```

In this snippet, `fork()` is used to created a new child process. If the process creation is successful, fork() returns the process ID of the child process. If unsuccessful, it returns a negative value.