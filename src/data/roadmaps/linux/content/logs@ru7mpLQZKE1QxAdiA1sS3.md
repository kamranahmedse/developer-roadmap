# System Logs

Linux maintains logs documenting system activities, errors, and kernel messages. Boot logs record all operations during system startup for troubleshooting. Use `dmesg` to view kernel ring buffer messages in real-time, or access logs in `/var/log`. Systemd uses `journalctl` for logging. Log levels range from emergency (system unusable) to debug messages.

Visit the following resources to learn more:

- [@article@How to Use journalctl Command to Analyze Logs in Linux](https://linuxhandbook.com/journalctl-command/)
- [@article@How to Check System Logs on Linux](https://www.fosslinux.com/8984/how-to-check-system-logs-on-linux-complete-usage-guide.htm)
- [@article@What is dmesg in Linux, And How Do I Use It?](https://linuxconfig.org/what-is-dmesg-and-how-do-i-use-it)