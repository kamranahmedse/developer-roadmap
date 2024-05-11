# Per-User Per-Database Settings in PostgreSQL

PostgreSQL allows you to apply configuration settings on a per-user and per-database basis, providing fine-grained control to optimize performance and stability. This is particularly useful when you have multiple databases or users with different workloads and requirements. In this section, we'll dive into per-user per-database settings and provide examples of how to configure them.

## Configuration

You can set per-user per-database configurations by modifying the `postgresql.conf` file or using the `ALTER DATABASE` and `ALTER ROLE` SQL commands.

### postgresql.conf

To set per-database and per-user configurations in `postgresql.conf`, use the following syntax:

```
# For a specific database:
dbname.key = value

# For a specific user:
username.key = value

# For a specific user and database:
username@dbname.key = value
```

Here, `dbname` refers to the database name, `username` to the user name, and `key` to the configuration parameter.

For example, if you want to set `shared_buffers` for the database `app_db` and user `app_user`, you can do so by adding the following lines to `postgresql.conf`:

```
app_db.shared_buffers = 128MB
app_user.app_db.shared_buffers = 64MB
```

### ALTER DATABASE and ALTER ROLE

You can also set per-user per-database configuration parameters using the `ALTER DATABASE` and `ALTER ROLE` SQL commands. 

For example, to set the `temp_buffers` configuration parameter for the database `app_db`, you can run:

```sql
ALTER DATABASE app_db SET temp_buffers = '64MB';
```

And to set the `work_mem` configuration parameter for the user `app_user` in `app_db`, you can run:

```sql
ALTER ROLE app_user IN DATABASE app_db SET work_mem = '32MB';
```

**Note**: The `ALTER DATABASE` and `ALTER ROLE` SQL commands store the configuration settings in the `pg_db_role_setting` system catalog table. You can query this table to view the current settings.

## Precedence

PostgreSQL has several levels of configuration setting precedence, which are applied in the following order:

- Settings in the `postgresql.conf` file
- Settings made with the `ALTER DATABASE` statement
- Settings made with the `ALTER ROLE` statement
- Settings made with the `ALTER ROLE IN DATABASE` statement

Keep this precedence order in mind when configuring per-user and per-database settings to ensure the expected settings take effect.

## Conclusion

Per-user per-database settings in PostgreSQL offer an extra layer of control to fine-tune your database performance and resource allocation. By leveraging the `postgresql.conf` file or using SQL commands such as `ALTER DATABASE` and `ALTER ROLE`, you can configure different settings for different use cases and workloads, optimizing your PostgreSQL environment for your specific requirements.