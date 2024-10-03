# Introduction to Logs

Linux, like other operating systems, maintains logs to help administrators understand system activities, errors, and kernel messages. Particularly during the boot process, when key system components are loaded and initialized, insightful log messages can provide valuable insights.

The "logs under booting" in Linux refer to the messages and information generated during the boot process. These logs record all operations and events that take place while the system is booting, which can assist in diagnosing issues or understanding system behavior.

Linux utilizes various log message levels, from `emerg` (the system is unusable) to `debug` (debug-level messages). During the boot process, messages from different system components, such as the kernel, init, and services, are stored. Many Linux distributions, including Ubuntu Linux, use the systemd logging system, `journalctl`, which holds the logs of the boot process.

To view boot messages in real-time, you can use the `dmesg` command, which reads and prints the kernel ring buffer. Alternatively, you can access the logging setup of your system, which often includes text files in `/var/log`.

```shell
# View boot logs in real-time
dmesg | less

# View boot logs using journalctl
sudo journalctl -b
```

The `dmesg` command presents the boot logs in a less direct format, allowing you to scroll up and down. The kernel ring buffer has a limited size, so older messages may be discarded over time. The `journalctl` command, on the other hand, provides a more comprehensive view of the boot process logs.
