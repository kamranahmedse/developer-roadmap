# Using pg_ctlcluster

`pg_ctlcluster` is a command-line utility provided by PostgreSQL to manage database clusters. It is especially helpful for users who have multiple PostgreSQL clusters running on the same system. In this section, we will explore the essential features of `pg_ctlcluster` for installing and setting up PostgreSQL database clusters.

## Overview

`pg_ctlcluster` is a wrapper utility around the standard PostgreSQL `pg_ctl` utility to manage multiple instances of PostgreSQL clusters on your system. The key distinction between the two utilities is that `pg_ctlcluster` works at the cluster level, not at the instance level like `pg_ctl`. 

`pg_ctlcluster` is hardware-agnostic and can be used on various platforms, including Debian, Ubuntu, and other Linux distributions.

## Syntax

The basic syntax for `pg_ctlcluster` is as follows:

```
pg_ctlcluster <version> <cluster name> <action> [<options>]
```

Where:

- `<version>`: The PostgreSQL version you want to operate on.
- `<cluster name>`: The name of the cluster you want to manage.
- `<action>`: The action to perform, such as `start`, `stop`, `restart`, `reload`, `status`, or `promote`.
- `[<options>]`: Optional flags and arguments you want to give the command.

## Common Actions

Here are some of the most common actions you can perform with `pg_ctlcluster`:

- **Start a cluster**: To start a specific PostgreSQL cluster running at a particular version, you can use the following command:

   ```bash
   pg_ctlcluster <version> <cluster name> start
   ```

- **Stop a cluster**: To stop a specific PostgreSQL cluster running at a particular version, use the following command:

   ```bash
   pg_ctlcluster <version> <cluster name> stop
   ```

- **Restart a cluster**: To restart a specific PostgreSQL cluster running at a particular version, use the following command:

   ```bash
   pg_ctlcluster <version> <cluster name> restart
   ```

- **Reload a cluster**: To reload the PostgreSQL cluster configuration without stopping and starting the server, use:

   ```bash
   pg_ctlcluster <version> <cluster name> reload
   ```

- **Get cluster status**: To check the status of a specific PostgreSQL cluster running at a particular version, use:

   ```bash
   pg_ctlcluster <version> <cluster name> status
   ```

- **Promote a cluster**: To promote a standby cluster to the primary cluster (useful in replication scenarios), you can use:

   ```bash
   pg_ctlcluster <version> <cluster name> promote
   ```

## Additional Options

You can also use additional command options with `pg_ctlcluster`, such as:

- `--foreground`: Run the server in the foreground.
- `--fast`: Stop the database cluster abruptly.
- `--timeout`: Add a timeout duration for starting, stopping, or restarting a cluster.
- `--options`: Pass additional options to the main `postgresql` executable.

## Conclusion

`pg_ctlcluster` is a powerful tool to manage multiple PostgreSQL clusters running on the same machine. It makes it easy to start, stop, and monitor the status of your clusters, allowing you to efficiently manage your PostgreSQL installations.

For more detailed information, check the official [PostgreSQL documentation](https://www.postgresql.org/docs/current/pgctlcluster.html).