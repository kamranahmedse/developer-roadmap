# Domains in PostgreSQL

Domains in PostgreSQL are essentially user-defined data types that can be created using the `CREATE DOMAIN` command. These custom data types allow you to apply constraints and validation rules to columns in your tables by defining a set of values that are valid for a particular attribute or field. This ensures consistency and data integrity within your relational database.

## Creating Domains

To create a custom domain, you need to define a name for your domain, specify its underlying data type, and set any constraints or default values you want to apply. The syntax for creating a new domain is:

```sql
CREATE DOMAIN domain_name AS underlying_data_type
  [DEFAULT expression]
  [NOT NULL]
  [CHECK (condition)];
```

- `domain_name`: The name of the custom domain you want to create.
- `underlying_data_type`: The existing PostgreSQL data type on which your domain is based.
- `DEFAULT expression`: An optional default value for the domain when no value is provided.
- `NOT NULL`: Determines whether null values are allowed in the domain. If set, null values are not allowed.
- `CHECK (condition)`: Specifies a constraint that must be met for values in the domain.

## Example

Suppose you want to create a custom domain to store phone numbers. This domain should only accept valid 10-digit phone numbers as input. Here's an example of how you might define this domain:

```sql
CREATE DOMAIN phone_number AS VARCHAR(10)
  NOT NULL
  CHECK (VALUE ~ '^[0-9]{10}$');
```

Now that your `phone_number` domain is created, you can use it when defining columns in your tables. For example:

```sql
CREATE TABLE customers (
  id serial PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  phone phone_number
);
```

In this example, the `phone` column is based on the `phone_number` domain and will only accept values that pass the defined constraints.

## Modifying and Deleting Domains

You can alter your custom domains by using the `ALTER DOMAIN` command. To delete a domain, you can use the `DROP DOMAIN` command. Be aware that dropping a domain may affect the tables with columns based on it.

## Summary

Domains in PostgreSQL are a great way to enforce data integrity and consistency in your relational database. They allow you to create custom data types based on existing data types with added constraints, default values, and validation rules. By using domains, you can streamline your database schema and ensure that your data complies with your business rules or requirements.