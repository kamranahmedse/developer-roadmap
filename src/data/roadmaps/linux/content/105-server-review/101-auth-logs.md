# Auth Logs 

When dealing with a Linux server and its maintenance, one of the most critical components to regularly review is the auth logs. These logs record all authentication-related events and activities which have occurred on the server, including: system logins, password changes, and sudo commands. 

- **Debian-based Systems (e.g., Ubuntu):** Logs are typically found in `/var/log/auth.log`.
- **Red Hat-based Systems (e.g., CentOS):** Logs are stored in `/var/log/secure`.
  
Here is an example of how you can use the `tail` command to view the last few entries of the authentication log:

```bash
tail /var/log/auth.log
```

With the rise of `systemd`, many Linux distributions now use `systemd-journald` for centralized logging, replacing traditional log files with a binary log format. Here is an example how to view sshd related logs:

```bash
sudo journalctl | grep sshd
```

Auth logs are an invaluable tool for monitoring and analyzing the security of your Linux server. They can indicate brute force login attacks, unauthorized access attempts, and any suspicious behavior. Regular analysis of these logs is a fundamental task in ensuring server security and data integrity.

Get yourself familiar with reading and understanding auth logs, as it's one essential way to keep your server secure.
