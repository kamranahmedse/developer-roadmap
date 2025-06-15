# System Logs

Linux maintains logs documenting system activities, errors, and kernel messages. Boot logs record all operations during system startup for troubleshooting. Use `dmesg` to view kernel ring buffer messages in real-time, or access logs in `/var/log`. Systemd uses `journalctl` for logging. Log levels range from emergency (system unusable) to debug messages.