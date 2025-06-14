# Authentication Logs

Authentication logs in Linux record all auth-related events like logins, password changes, and sudo commands. Located at `/var/log/auth.log` (Debian) or `/var/log/secure` (RHEL/CentOS), these logs help detect brute force attacks and unauthorized access attempts. Use `tail /var/log/auth.log` to view recent entries. Regular log analysis is essential for server security monitoring.

Here is an example of how you can use the `tail` command to view the last few entries of the authentication log:

```bash
tail /var/log/auth.log
```

Get yourself familiar with reading and understanding auth logs, as it's one essential way to keep your server secure.