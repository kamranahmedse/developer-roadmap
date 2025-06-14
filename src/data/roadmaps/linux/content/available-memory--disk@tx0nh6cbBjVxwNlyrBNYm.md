# Available Memory and Disk

Linux provides tools like `free`, `vmstat`, and `top` to monitor system memory usage and performance. The `free -h` command shows total, used, free, shared, buffer/cache, and available memory in human-readable format. Regular memory monitoring helps maintain optimal server performance, prevent overload, and troubleshoot resource issues effectively.

The `free` command, for instance, gives a summary of the overall memory usage including total used and free memory, swap memory and buffer/cache memory. Here's an example:

```bash
$ free -h
              total        used        free      shared  buff/cache   available
Mem:           15Gi       10Gi       256Mi       690Mi       5.3Gi       4.2Gi
Swap:         8.0Gi       1.3Gi       6.7Gi
```

In this output, the '-h' option is used to present the results in a human-readable format. Understanding the state of memory usage in your Linux server can help maintain optimal server performance and troubleshoot any potential issues.