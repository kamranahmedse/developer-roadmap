# System Logs

Linux maintains logs documenting system activities, errors, and kernel messages. Boot logs record all operations during system startup for troubleshooting. Use `dmesg` to view kernel ring buffer messages in real-time, or access logs in `/var/log`. Systemd uses `journalctl` for logging. Log levels range from emergency (system unusable) to debug messages.

The "logs under booting" in Linux refers to the messages and information that are generated during the boot process. These logs record all operations and events that take place while the system is booting, which might assist in diagnosing a system issue or understanding system behavior. 

Linux utilizes various log message levels from `emerg` (the system is unusable) to `debug` (debug-level messages). During the boot process, messages from various components of the system like kernel, init, services, etc., are stored. Many Linux distributions use systemd logging system, `journalctl`, which holds the logs of the boot process.

Viewing boot messages can occur in real-time with the `dmesg` command. It's used to read and print the kernel ring buffer. Or they can be accessed via the logging setup of your system, which often includes text files in `/var/log`. 

```shell
dmesg | less
```

This command presents the boot logs in a less direct format with the ability to scroll up and down. The kernel ring buffer only has a certain size, so old messages will be discarded after some time.