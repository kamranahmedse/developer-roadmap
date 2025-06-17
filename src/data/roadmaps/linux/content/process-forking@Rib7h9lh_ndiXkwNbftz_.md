# Process Forking

Process forking allows a running process (parent) to create a copy of itself (child) using the `fork()` system call. The child process is nearly identical to the parent except for process ID and parent process ID. Both processes execute concurrently and independently - changes in one don't affect the other. This mechanism is fundamental for Linux process creation.

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