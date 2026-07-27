# Checking Service Logs

Systemd captures output from all managed services and stores it in the journal, a binary log managed by journald. You can view logs for a specific service using journalctl -u service-name. Useful flags include -f to follow logs in real time, --since and --until to filter by time range, and -n to limit the number of lines shown. Logs include both stdout/stderr from the process and systemd lifecycle events.

Visit the following resources to learn more:

- [@article@Journalctl Explained: How To View And Analyze Systemd Logs.](https://uptimerobot.com/knowledge-hub/logging/journalctl-explained-how-to-view-and-analyze-systemd-logs/)
- [@article@How To Use journalctl to View and Manipulate systemd Logs on Linux](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs)