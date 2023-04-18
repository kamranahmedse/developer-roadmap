# Schemas

## Schemas in PostgreSQL

In PostgreSQL, a schema is a namespace that holds a collection of database objects such as tables, views, functions, and operators. Schemas help you in organizing your database objects and managing access controls effectively.

### Benefits of using schemas

1. **Organization**: Schemas allow you to group database objects into logical units, making it easier for you to organize and search for objects.

2. **Access control**: Schemas make it possible to set permissions at the schema level, which can be beneficial for managing access to subsets of database objects.

3. **Separation**: Schemas can be used to create separate environments within a single database, which can be useful for development, testing, and production stages.

4. **Schema search path**: Using a search path, you can control which schemas your queries should access without explicitly specifying the schema when referencing database objects.

### Creating and managing schemas

To create a new schema, you can use the `CREATE SCHEMA` command:

```sql
CREATE SCHEMA schema_name;
```

To drop a schema and all its associated objects, you can use the `DROP SCHEMA` command:

```sql
DROP SCHEMA schema_name CASCADE;
```

To view a list of all available schemas within your database, you can query the `pg_namespace` system catalog table:

```sql
SELECT nspname FROM pg_namespace;
```

### Schema search path

By default, PostgreSQL has an implicit schema search path that includes the `public` schema. You can modify the search path by setting the `search_path` configuration parameter.

For example, to set the search path to include both the `public` and `myschema` schemas, you can run the following command:

```sql
SET search_path TO myschema, public;
```

This command will include both schemas in the search path without having to explicitly specify the schema name when querying objects.

### Access control

You can manage access control for schemas by granting or revoking privileges for specific users or roles. Here are some commonly used privileges:

- `USAGE`: Allows a user/role to access objects within the schema.
- `CREATE`: Allows a user/role to create new objects within the schema.
- `ALTER`: Allows a user/role to modify the schema and its objects.

For example, granting `USAGE` and `CREATE` permissions to a user `john` on schema `myschema`:

```sql
GRANT USAGE, CREATE ON SCHEMA myschema TO john;
```

In summary, schemas are a powerful feature in PostgreSQL that allow you to create, manage, and organize your database objects more effectively. By understanding schemas and their capabilities, you can develop better strategies for organizing your objects and controlling access in your PostgreSQL database.