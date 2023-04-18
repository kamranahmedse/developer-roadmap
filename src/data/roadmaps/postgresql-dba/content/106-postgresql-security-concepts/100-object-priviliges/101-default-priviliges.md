# Default Privileges

## Default Privileges in PostgreSQL

Default privileges in PostgreSQL are the permissions that are automatically assigned to objects within a database when they are created. These privileges determine what actions can be performed on the objects and by which users or roles.

### Understanding Default Privileges

By default, PostgreSQL assigns certain privileges to the user or role that creates the object, as well as the public group. Here's a breakdown of default privileges assigned to different object types:

- **Tables**: The creator of a table gets all the privileges including SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, and TRIGGER. The PUBLIC group doesn't have any privileges by default.

- **Sequences**: The user who created the sequence gets USAGE, SELECT, UPDATE privileges. Similarly, the PUBLIC group doesn't have any privileges by default.

- **Functions**: The creator of a function gets EXECUTE privilege, and the PUBLIC group gets no privileges by default.

- **Types and Domains**: The user who creates the TYPE or DOMAIN gets USAGE privilege, and the PUBLIC group doesn't have any privileges by default.

- **Schemas**: The creator of a schema gets CREATE, USAGE, and TEMPORARY privileges. The PUBLIC group gets only the USAGE privilege on the schema.

### Modifying Default Privileges

You can modify the default privileges for newly created objects by using the `ALTER DEFAULT PRIVILEGES` command. This command allows to specify roles or users, set the grant options, and specify the object we want to modify the default privileges for.

#### Syntax

```sql
ALTER DEFAULT PRIVILEGES
    [ FOR { ROLE | USER } target_role [, ...] ]
    [ IN SCHEMA schema_name [, ...] ]
    { GRANT | REVOKE [ GRANT OPTION FOR ] } privileges
    ON { ALL TABLES | ALL SEQUENCES | ALL FUNCTIONS | ALL TYPES | ALL DOMAINS }
    TO { [ GROUP ] role_name | PUBLIC } [, ...] [ WITH HIERARCHY ]
```

#### Example

Here's an example of how to grant SELECT permission on all newly created tables to the role `readonly_user`:

```sql
ALTER DEFAULT PRIVILEGES
    IN SCHEMA public
    GRANT SELECT ON TABLES
    TO readonly_user;
```

Keep in mind that modifying default privileges only applies to future objects, not existing ones. If you want to modify the privileges of existing objects, you have to use the `GRANT` and `REVOKE` commands for each object explicitly.