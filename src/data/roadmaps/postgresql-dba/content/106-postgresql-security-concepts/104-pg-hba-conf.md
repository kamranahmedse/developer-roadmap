# pg_hba.conf

## pg_hba.conf

The `pg_hba.conf` file is a crucial element in PostgreSQL security. It controls the client authentication process, defining the access rules for users connecting to the database. It is located in the PostgreSQL data directory, typically `/var/lib/pgsql/xx/main/pg_hba.conf`.

### Access control in pg_hba.conf

To manage access control, `pg_hba.conf` uses entries that define a set of rules for each user, combining the following:

- **Connection type**: Determines whether the connection is local or remote. For local connections, use "`local`." For remote connections, use "`host`," "`hostssl`," or "`hostnossl`."

- **Database**: Specifies the database(s) the user can access. You can use specific database names or keywords like "`all`," "`sameuser`," or "`samerole`."

- **User**: Identifies the user(s) allowed to access the database. You can use specific usernames or keywords like "`all`."

- **Address**: Specifies the IP address or subnet (for remote connections) or local UNIX domain sockets (for local connections) that the user can access.

- **Authentication method**: Defines the required authentication method, such as "`trust`," "`md5`," "`password`," "`gss`," "`sspi`," "`ident`," "`peer`," "`pam`," "`ldap`," "`radius`," or "`cert`."

### Example of a pg_hba.conf file

```
# Allow local connections from any user to any database
local   all         all                     trust

# Allow remote connections from the "example_app" user to the "exampledb" database
host    exampledb   example_app   192.168.1.0/24    md5

# Allow SSL connections from the "replica" user to the "replication" database
hostssl replication replica       ::/0              cert clientcert=1
```

### Modifying pg_hba.conf

To change the authentication settings, open the `pg_hba.conf` file with your preferred text editor and make the necessary adjustments. It is essential to maintain the correct format, as invalid entries can compromise the database's security or prevent user connections.

Once you've made changes to the file, save it and reload the PostgreSQL server for the changes to take effect, using the following command:

```
sudo systemctl reload postgresql
```

### Best practices

- Review the default PostgreSQL configuration and ensure you modify it to follow your organization's security rules.
- Keep the `pg_hba.conf` file under version control to track changes and help with auditing.
- Use the least privilege principle – grant only the necessary access to users to minimize the risk of unauthorized actions.
- Use `hostssl` to enforce secure SSL connections from remote clients.