# Process Priorities

Linux assigns priority levels to processes for efficient resource utilization and execution timing. Priority values ("nice" values) range from -20 (highest) to +19 (lowest priority). View priorities with `ps -eo pid,pri,user,comm`. Change priorities using `renice -5 -p [PID]`. Essential for system performance optimization and CPU resource management.

Visit the following resources to learn more:

- [@article@Understanding Process Thread Priorities in Linux](https://blogs.oracle.com/linux/post/task-priority)
- [@article@How To Manipulate Process Priority In Linux](https://www.itsmarttricks.com/how-to-manipulate-process-priority-in-linux-using-nice-and-renice-commands/)