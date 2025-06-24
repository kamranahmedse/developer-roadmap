# Process Priorities

Linux assigns priority levels to processes, affecting execution timing and resource allocation. Process priorities use "nice" values ranging from -20 (highest priority) to +19 (lowest priority) and only root can set negative nive value. The `/proc` filesystem contains process information including priorities. You can view priorities with `ps -eo pid,pri,user,comm` and modify them using `renice` command.

Visit the following resource to learn more:

- [@article@Understanding Process Thread Priorities in Linux](https://blogs.oracle.com/linux/post/task-priority)
- [@article@How To Manipulate Process Priority In Linux](https://www.itsmarttricks.com/how-to-manipulate-process-priority-in-linux-using-nice-and-renice-commands/)