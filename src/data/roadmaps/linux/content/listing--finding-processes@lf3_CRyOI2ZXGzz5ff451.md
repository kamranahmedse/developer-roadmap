# Listing and Finding Processes

Linux provides several tools to list and monitor running processes. The `/proc` filesystem contains process information accessible via PID directories. Commands like `ps -ef` show process snapshots, while `top` and `htop` provide real-time process monitoring. Use `cat /proc/{PID}/status` to view specific process details. These tools are essential for system monitoring and troubleshooting.

```bash
# list all running processes
ps -ef 

# display ongoing list of running processes 
top

# alternatively, for a more user-friendly interface
htop
```
Exploring the proc directory (`/proc`), we dive even deeper, enabling us to view the system's kernel parameters and each process's specific system details.

```bash
# view specifics of a particular PID
cat /proc/{PID}/status
```
In short, 'Finding and Listing Processes (proc)' in Linux is not just a core aspect of process management, but also a necessary skill for enhancing system performance and resolution of issues.

Visit the following resources to learn more:

- [@article@The /proc File System](https://www.kernel.org/doc/html/latest/filesystems/proc.html)
