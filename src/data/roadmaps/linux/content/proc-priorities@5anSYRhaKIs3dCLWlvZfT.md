# Process Priorities

Linux assigns priority levels to processes for efficient resource utilization and execution timing. Priority values ("nice" values) range from -20 (highest) to +19 (lowest priority). View priorities with `ps -eo pid,pri,user,comm`. Change priorities using `renice -5 -p [PID]`. Essential for system performance optimization and CPU resource management.

Here's a simple command in the Linux terminal to display the process ID, priority, and user for all processes:

```