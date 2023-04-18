# Object Priviliges

# PostgreSQL Object Privileges

Object privileges are a set of permissions that provide a secure way to manage access control and regulate users' actions on specific database objects such as tables, sequences, functions, and more. This section will provide a brief summary of object privileges, the types of object privileges, and how to define them in PostgreSQL.

## Types of Object Privileges

PostgreSQL provides multiple types of object privileges, depending on the type of object. Some common object types and their corresponding privileges are:

- **Tables**: SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, and TRIGGER.
- **Sequences**: USAGE, SELECT, UPDATE.
- **Functions**: EXECUTE.
- **Types**: USAGE.

These privileges regulate which database operations a user can execute on a specific object.

## Granting and Revoking Object Privileges

To grant or revoke object privileges, use the `GRANT` and `REVOKE` commands, respectively. The basic syntax for granting privileges on a table is as follows:

```
GRANT privilege [, ...]
ON object_type object_name [, ...]
TO role_specification [, ...]
[WITH CHECK OPTION | WITH OUT CHECK OPTION]
[WITH CASCADE | WITH RESTRICT]
[RESIDUAL]
```

For example, to grant SELECT, INSERT, and UPDATE privileges on the table "employees" to the user "HR_department", you can execute the following SQL command:

```
GRANT SELECT, INSERT, UPDATE
ON TABLE employees
TO HR_department;
```

To revoke any of these privileges, you can use the `REVOKE` command with the same syntax as the `GRANT` command:

```
REVOKE SELECT, INSERT, UPDATE
ON TABLE employees
FROM HR_department;
```

## Default Privileges

When a new object is created, it usually inherits default privileges based on the current user or the owner of the schema containing the object. To modify these default privileges, you can use the `ALTER DEFAULT PRIVILEGES` command. This allows you to define which privileges should be granted to which roles by default when an object is created.

For example, to grant SELECT, INSERT, and UPDATE privileges to the user "HR_department" on all future tables, you can execute the following SQL command:

```
ALTER DEFAULT PRIVILEGES
FOR ROLE HR_department
GRANT SELECT, INSERT, UPDATE ON TABLES TO HR_department;
```

By understanding and properly applying PostgreSQL object privileges, you can ensure a secure and well-organized access control system for your database objects. Remember to periodically review these privileges and make necessary adjustments to maintain the desired level of security.