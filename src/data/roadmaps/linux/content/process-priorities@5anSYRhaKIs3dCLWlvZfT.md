# Process Priorities

Linux assigns priority levels to processes, affecting execution timing and resource allocation. Process priorities use "nice" values ranging from -20 (highest priority) to +19 (lowest priority) and only root can set negative nive value. The `/proc` filesystem contains process information including priorities. You can view priorities with `ps -eo pid,pri,user,comm` and modify them using `renice` command.

Here's a simple command in the Linux terminal to display the process ID, priority, and user for all processes:

```bash
ps -eo pid,pri,user,comm
```

command explanations:
- `ps` = a command to display running processes
- `-e` = an option to display every processes
- `-o` = an option to custom output format
- `pid,pri,user,comm` = columns to display

columns explanations:
`pid` = Process ID
`pri` = Priority (lower number = higher priority)
`user` = User who owns the process
`comm` = Command name

We can use the `--sort=-pri` option to display processes sorted by priority (highest first), so the code will be:

```bash
ps -eo pid,pri,user,comm --sort=-pri
```

Visit the following resource to learn more:

- [@article@niceness](https://linuxjourney.com/lesson/process-niceness)
