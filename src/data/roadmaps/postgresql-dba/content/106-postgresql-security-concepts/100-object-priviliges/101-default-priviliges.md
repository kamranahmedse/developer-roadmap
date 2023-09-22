# Default Privileges in PostgreSQL

PostgreSQL allows you to define object privileges for various types of database objects. These privileges determine if a user can access and manipulate objects like tables, views, sequences, or functions. In this section, we will focus on understanding default privileges in PostgreSQL.

## What are default privileges?

When an object is created in PostgreSQL, it is assigned a set of initial privileges. These initial privileges are known as _default privileges_. Default privileges are applied to objects created by a specific user, and can be configured to grant or restrict access to other users or groups.

The main purpose of default privileges is to simplify the process of granting the necessary access to objects for various database users. By configuring default privileges, you can control the level of access users have to database objects without having to manually assign privileges each time a new object is created.

## Configuring default privileges

To configure default privileges, you can use the `ALTER DEFAULT PRIVILEGES` command. This command allows you to define the privileges that are granted or revoked by default for objects created by a specific user.

Here's a basic syntax of the `ALTER DEFAULT PRIVILEGES` command:

```sql
ALTER DEFAULT PRIVILEGES
    [ FOR { ROLE | USER } target_role [, ...] ]
    [ IN SCHEMA schema_name [, ...] ]
    { GRANT | REVOKE } privs
    [ GRANT OPTION ]
    [ CASCADE | RESTRICT ]
```

Let's go through some examples to better understand how to use this command:

**Example 1:** Grant SELECT privilege on all tables created by user1 to user2:

```sql
ALTER DEFAULT PRIVILEGES FOR USER user1
    GRANT SELECT ON TABLES TO user2;
```

**Example 2:** Revoke INSERT privilege on all sequences created by user1 in schema 'public' from user3:

```sql
ALTER DEFAULT PRIVILEGES FOR USER user1
    IN SCHEMA public
    REVOKE INSERT ON SEQUENCES FROM user3;
```

## Resetting default privileges

To reset the default privileges to the system defaults, you can simply revoke the previously granted privileges using the `ALTER DEFAULT PRIVILEGES` command along with the `REVOKE` clause.

For example, to reset the default privileges on tables created by user1:

```sql
ALTER DEFAULT PRIVILEGES FOR USER user1
    REVOKE ALL PRIVILEGES ON TABLES FROM PUBLIC;
```

## Summary

In conclusion, default privileges in PostgreSQL are a convenient way to automatically grant or restrict users' access to database objects. You can control the default privileges using the `ALTER DEFAULT PRIVILEGES` command, making it easier to manage object-level permissions across your database for specific users or groups.