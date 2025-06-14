# Process Forking

Process forking uses the `fork()` system call to create child processes from parent processes, enabling concurrent execution. Child processes are nearly perfect copies of parents with different PIDs. Changes in child processes don't affect parents. Essential for understanding Linux process creation and control in multi-processing environments.

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