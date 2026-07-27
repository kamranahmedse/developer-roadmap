# Authentication Logs

Authentication logs in Linux record all auth-related events like logins, password changes, and sudo commands. Located at `/var/log/auth.log` (Debian) or `/var/log/secure` (RHEL/CentOS), these logs help detect brute force attacks and unauthorized access attempts. Use `tail /var/log/auth.log` to view recent entries. Regular log analysis is essential for server security monitoring.

Visit the following resources to learn more:

- [@article@Monitoring Linux Authentication Logs](https://betterstack.com/community/guides/logging/monitoring-linux-auth-logs/)
- [@article@How to Check Linux Login History - Linux Handbook](https://linuxhandbook.com/linux-login-history/)