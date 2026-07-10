# Process Management

Process management covers creating, controlling, and terminating processes from within a C program, typically using POSIX functions like `fork` to create a new process, `exec` to replace a process's program with a new one, and `wait` to have a parent process wait for a child process to finish. This is the foundation for how shells and other programs launch and manage other programs. It is closely related to but distinct from concurrency, since separate processes have their own independent memory space unlike threads.

Visit the following resources to learn more:

- [@article@Process Management: Operating System](https://dev.to/harshm03/process-management-operating-system-18gl)
- [@article@Mastering fork() and exec() in C: The Complete Beginner’s Guide to Process Management in Unix-like Systems](https://levelup.gitconnected.com/mastering-fork-and-exec-in-c-a-beginners-guide-to-process-management-in-unix-like-operating-81b2b19b4dfe)
- [@video@Process Management (Processes and Threads)](https://www.youtube.com/watch?v=OrM7nZcxXZU)