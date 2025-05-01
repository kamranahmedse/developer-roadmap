# Auth Logs 

When dealing with a Linux server and its maintenance, one of the most critical components to regularly review is the auth logs. These logs, usually located in /var/log/auth.log (for Debian-based distributions) or /var/log/secure (for Red Hat and CentOS), record all authentication-related events and activities which have occurred on the server. This includes, among others, system logins, password changes, and issued sudo commands. 

Auth logs are an invaluable tool for monitoring and analyzing the security of your Linux server. They can indicate brute force login attacks, unauthorized access attempts, and any suspicious behavior. Regular analysis of these logs is a fundamental task in ensuring server security and data integrity.

Here is an example of how you can use the `tail` command to view the last few entries of the authentication log:

```bash
tail /var/log/auth.log
```
However, there is a newer way to see the logs in your system. In the Debian OS there is a directory called **journal** located in the /var/log. To access the collected log data it is required to use the `journalctl` command, which will output the logs.
Here is an example of how you can use the `journalctl` command:

```bash
journalctl --since "yesterday" 
```
The last command will display all the collected information since the day before the current day. You may want to use the man journalctl to see all the options available for this command.


Get yourself familiar with reading and understanding auth logs, as it's one essential way to keep your server secure.
