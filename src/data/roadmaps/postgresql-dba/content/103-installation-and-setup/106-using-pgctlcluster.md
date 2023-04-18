# Using `pg_ctlcluster`

## Using pg_ctlcluster
_pg_ctlcluster_ is a utility for managing and controlling your PostgreSQL clusters. This section will cover the most commonly used options for the _pg_ctlcluster_ command.

### Starting a PostgreSQL Cluster
To start a cluster, you should provide the version, cluster name, and the `start` option:
```
pg_ctlcluster <version> <cluster_name> start
```
For example, to start a cluster with version 11 and named "main":
```
pg_ctlcluster 11 main start
```

### Stopping a PostgreSQL Cluster
To stop a cluster, simply replace the `start` option with `stop` in the previous command:
```
pg_ctlcluster <version> <cluster_name> stop
```

### Restarting a PostgreSQL Cluster
If you need to restart a cluster, you can use the `restart` option:
```
pg_ctlcluster <version> <cluster_name> restart
```

### Viewing PostgreSQL Cluster Status
To check the status of your PostgreSQL cluster, use the `status` option:
```
pg_ctlcluster <version> <cluster_name> status
```

### Managing Cluster Logs
By default, the `pg_ctlcluster` logs are stored in the `/var/log/postgresql` directory, with the file named `postgresql-<version>-<cluster_name>.log`. You can view logs in real-time using the `tail` command:
```
tail -f /var/log/postgresql/postgresql-<version>-<cluster_name>.log
```

### Custom Configuration Files
_pg_ctlcluster_ allows specifying custom configuration files with the `--config-file` and `--hba-file` options.

* Use `--config-file` to point to a custom postgresql.conf file:
  ```
  pg_ctlcluster <version> <cluster_name> start --config-file=<path_to_custom_conf>
  ```

* Use `--hba-file` to point to a custom pg_hba.conf file:
  ```
  pg_ctlcluster <version> <cluster_name> start --hba-file=<path_to_custom_pg_hba_conf>
  ```

### Conclusion
_pg_ctlcluster_ is a powerful utility to manage PostgreSQL clusters. This guide covered the most commonly used options, such as starting, stopping, and restarting clusters. Additionally, it reviewed checking cluster status, viewing logs, and specifying custom configuration files. With these commands in hand, you'll be well-equipped to manage your PostgreSQL clusters effectively.