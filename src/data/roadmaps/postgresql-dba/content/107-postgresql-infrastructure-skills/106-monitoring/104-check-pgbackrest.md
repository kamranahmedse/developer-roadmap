# check_pgbackrest

## Check pgBackRest

In this section, we'll discuss the importance of monitoring your PostgreSQL backup and recovery solution, specifically focusing on `check pgBackRest`. `pgBackRest` is a widely-used backup tool for PostgreSQL databases, providing features like full, differential, incremental and archive backups, support for multiple repostories and threaded backup/restore processes.

### Why should you monitor pgBackRest?

Monitoring `pgBackRest` helps ensure that your PostgreSQL backups are consistent, up-to-date, and free from any potential issues. By regularly checking your backups, you'll be able to maintain a reliable and efficient backup-restore process for your PostgreSQL database.

### How to check pgBackRest?

`pgBackRest` provides a built-in command called `check` which performs various checks to validate your repository and configuration settings. The command is executed as follows:

```sh
pgbackrest --stanza=<stanza_name> check
```

`<stanza_name>` should be replaced with the name of the stanza for which you want to verify the repository and configuration settings.

### What does the check command do?

When you run `check pgBackRest`, it performs the following tasks:

1. **Configuration validation**: It verifies if the configuration file (`pgbackrest.conf`) contains valid settings and if the runtime parameters are properly set.

2. **Backup consistency**: It checks the consistency of backup files within the stanza, ensuring that there are no missing or incomplete backups.

3. **Archive validation**: It examines the state of WAL archive files, ensuring that they are present and retrievable as per the minimum and maximum settings specified in the configuration.

4. **Remote connectivity**: If any remote repositories are configured, it checks the connectivity to remote hosts and verifies that the repository paths are accessible.

### Conclusion

Regularly monitoring and checking `pgBackRest` is essential for maintaining a reliable backup and recovery solution for your PostgreSQL database. By using the built-in `check` command, you can ensure that your repository and configuration settings are validated, backups are consistent, and archives are available, providing you with peace of mind and making it easier to recover your database in case of any disaster.