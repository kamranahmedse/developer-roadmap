# check_pgbackrest

Monitoring `pgBackRest` helps ensure that your PostgreSQL backups are consistent, up-to-date, and free from any potential issues. By regularly checking your backups, you'll be able to maintain a reliable and efficient backup-restore process for your PostgreSQL database.

`pgBackRest` provides a built-in command called `check` which performs various checks to validate your repository and configuration settings. The command is executed as follows:

```sh
pgbackrest --stanza=<stanza_name> check
```

`<stanza_name>` should be replaced with the name of the stanza for which you want to verify the repository and configuration settings.

Learn more from the following resources:

- [@official@pgBackRest Website](https://pgbackrest.org/)