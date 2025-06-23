# Listing and Finding Processes

Linux processes can be monitored using the `proc` virtual filesystem and commands like `ps`, `top`, and `htop`. Use `ps -ef` for process snapshots, `top`/`htop` for real-time views. The `/proc` directory contains detailed process information. View specific process details with `cat /proc/{PID}/status`. Essential for system performance monitoring and troubleshooting.

Visit the following resources to learn more:

- [@article@The /proc File System](https://www.kernel.org/doc/html/latest/filesystems/proc.html)
- [@article@What is a Process in Linux/Unix?](https://www.scaler.com/topics/linux-process/)
- [@article@Exploring the Linux /proc Filesystem](https://www.redhat.com/en/blog/linux-proc-filesystem)