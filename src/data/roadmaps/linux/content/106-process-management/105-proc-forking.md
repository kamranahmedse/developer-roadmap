# Process Forking in Process Management

Process forking is a fundamental concept in process management on Linux systems. It refers to the mechanism where a running process (parent process) can create a copy of itself (child process), enabling concurrent execution of both processes. This is facilitated by the `fork()` system call, which is a crucial aspect in understanding the creation and control of processes in a Linux environment.

When a child process is created using `fork()`, it is a nearly identical copy of the parent process, with a few exceptions. The child process has a unique process ID (PID) and a different parent process ID (PPID) compared to the parent process. Any changes made in the child process do not affect the parent process, and vice versa.

Here's a basic code example of process forking in C, using Ubuntu Linux as the target system:

```c
#include <sys/types.h>
#include <unistd.h>
#include <stdio.h>

int main() {
    pid_t child_pid;

    // Create a child process
    child_pid = fork();

    // Check if the child process was created successfully
    if (child_pid >= 0) {
        printf("Child process created with PID: %d\n", child_pid);
    } else {
        printf("Fork failed\n");
    }

    return 0;
}
```

In this example, the `fork()` system call is used to create a new child process. If the process creation is successful, `fork()` returns the process ID of the child process. If the operation fails, it returns a negative value.
