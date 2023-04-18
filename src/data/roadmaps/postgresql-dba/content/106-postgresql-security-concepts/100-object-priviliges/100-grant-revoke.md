# Grant / Revoke

# Object Privileges: Grant and Revoke

In this section, we are going to discuss the essential concepts of **GRANT** and **REVOKE** in PostgreSQL. These terms relate to granting or revoking privileges for specific database objects, allowing you to control access and maintain security within your database environment.

## Granting Privileges

The **GRANT** command allows you to grant specific privileges on a database object to a user or a group of users. PostgreSQL supports several object types, such as:

- TABLE
- SEQUENCE
- DATABASE
- SCHEMA
- FUNCTION
- FOREIGN DATA WRAPPER
- FOREIGN SERVER
- LANGUAGES
- LARGE OBJECT

The general syntax for the **GRANT** command is as follows:

```sql
GRANT privilege [, ...]
ON object_type object_name [, ...]
TO {user | GROUP group | PUBLIC} [, ...]
[WITH ADMIN OPTION];
```

Here's an example to illustrate how to grant the SELECT privilege on a table called `employees` to a user named `john`:

```sql
GRANT SELECT ON TABLE employees TO john;
```

You can also grant multiple privileges at once:

```sql
GRANT SELECT, INSERT, UPDATE ON TABLE employees TO john;
```

## Revoking Privileges

The **REVOKE** command is used to revoke privileges previously granted to a user or a group of users. The general syntax is similar to the **GRANT** command, but you use **REVOKE** instead:

```sql
REVOKE privilege [, ...]
ON object_type object_name [, ...]
FROM {user | GROUP group | PUBLIC} [, ...];
```

Here's an example illustrating how to revoke the SELECT privilege on the `employees` table from the user `john`:

```sql
REVOKE SELECT ON TABLE employees FROM john;
```

Like **GRANT**, you can revoke multiple privileges at once:

```sql
REVOKE SELECT, INSERT, UPDATE ON TABLE employees FROM john;
```

## Summary

In this section, we discussed the importance of the **GRANT** and **REVOKE** commands in PostgreSQL. These commands allow a database administrator to grant or revoke specific privileges on database objects, ensuring secure access control within the database environment. Understanding and correctly implementing these privileges is a crucial aspect of the PostgreSQL DBA role.