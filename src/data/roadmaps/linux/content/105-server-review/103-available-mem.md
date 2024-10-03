# Monitoring System Memory Usage in Linux

Maintaining optimal system performance is crucial when running multiple applications in a Linux environment. Evaluating available memory is a common practice for system administrators to ensure their servers are not overloaded and have adequate resources for critical applications.

Linux provides several command-line tools to help monitor memory usage and performance metrics, such as `free`, `vmstat`, and `top`. These utilities can provide valuable insights into the overall memory usage, including total used and free memory, swap memory, and buffer/cache memory.

For example, the `free` command offers a summary of the current memory usage on your system. Here's an example output on an Ubuntu Linux system:

```bash
$ free -h
              total        used        free      shared  buff/cache   available
Mem:           15Gi       10Gi       256Mi       690Mi       5.3Gi       4.2Gi
Swap:         8.0Gi       1.3Gi       6.7Gi
```

In this output, the `-h` option is used to display the results in a human-readable format. The `total` column shows the total amount of memory available, while the `used` and `free` columns indicate the current usage and available memory, respectively. The `shared`, `buff/cache`, and `available` columns provide additional details about memory usage.
