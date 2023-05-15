# Schemas in PostgreSQL

Schemas are an essential aspect of PostgreSQL's DDL (Data Definition Language) queries which enable you to organize and structure your database objects such as tables, views, and sequences. In this section, we will discuss what schemas are, why they are useful, and how to interact with them using DDL queries.

## What are schemas?

A schema is a logical collection of database objects within a PostgreSQL database. It behaves like a namespace that allows you to group and isolate your database objects separately from other schemas. The primary goal of a schema is to organize your database structure, making it easier to manage and maintain.

By default, every PostgreSQL database has a `public` schema, which is the default search path for any unqualified table or other database object.

## Benefits of using schemas

- **Organization**: Schemas provide a way to categorize and logically group your database objects, making it easier to understand and maintain the database structure.

- **Access control**: Schemas enable you to manage permissions at the schema level, which makes it easier to control access to a particular set of objects.

- **Multi-tenant applications**: Schemas are useful in multi-tenant scenarios where each tenant has its own separate set of database objects. For example, in a Software as a Service (SaaS) application, each tenant can have their own schema containing their objects, isolated from other tenants.

## DDL Queries for managing schemas

### Creating a schema

To create a new schema, you can use the `CREATE SCHEMA` command:

```sql
CREATE SCHEMA schema_name;
```

For example, to create a schema named `sales`:

```sql
CREATE SCHEMA sales;
```

### Displaying available schemas

To view all available schemas within the current database:

```sql
SELECT * FROM information_schema.schemata;
```

### Dropping a schema

To drop a schema, use the `DROP SCHEMA` command. Be cautious when using this command as it will also delete all objects within the schema.

To drop a schema without deleting objects if any are present:

```sql
DROP SCHEMA IF EXISTS schema_name;
```

To delete a schema along with its contained objects:

```sql
DROP SCHEMA schema_name CASCADE;
```

## Setting the search path

When referring to a database object without specifying the schema, PostgreSQL will use the search path to resolve the object's schema. By default, the search path is set to the `public` schema.

To change the search path, you can use the `SET` command:

```sql
SET search_path TO schema_name;
```

This change only persists for the duration of your session. To permanently set the search path, you can modify the `search_path` configuration variable in the `postgresql.conf` file or by using the `ALTER DATABASE` command.

## Conclusion

Understanding and using schemas in PostgreSQL can help you effectively organize, manage, and maintain your database objects, enabling access control and supporting multi-tenant applications. By using DDL queries such as `CREATE SCHEMA`, `DROP SCHEMA`, and `SET search_path`, you can leverage schemas in your PostgreSQL database to achieve a more structured and maintainable system.