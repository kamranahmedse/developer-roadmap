# Domains

## Domains

In the relational model, a domain is a set of possible values, or a "type" that represents the characteristics of the data within columns of a table. Domains allow us to store, manipulate, and ensure the integrity of the data in a table. In PostgreSQL, a domain is a user-defined data type, which can consist of base types, composite types, and enumerated types, along with optional constraints such as NOT NULL and CHECK constraints.

Here is a brief summary of the key aspects of domains in PostgreSQL:

### 1. Domain creation

To create a domain, you can use the `CREATE DOMAIN` command, as follows:

```sql
CREATE DOMAIN domain_name [AS] data_type
[DEFAULT expression]
[NOT NULL | NULL]
[CHECK (constraint_expression)];
```

For example, to create a domain for storing email addresses, you can use the following command:

```sql
CREATE DOMAIN email_address AS varchar(255)
NOT NULL
CHECK (value ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,4}$');
```

### 2. Domain usage

Once you have created a domain, you can use it as a data type while defining the columns of a table. Here's an example:

```sql
CREATE TABLE users (
  id serial PRIMARY KEY,
  first_name varchar(25) NOT NULL,
  last_name varchar(25) NOT NULL,
  email email_address
);
```

### 3. Domain modification

To modify an existing domain, you can use the `ALTER DOMAIN` command. This command allows you to add or drop constraints, change the default value, and rename the domain. Here's an example:

```sql
ALTER DOMAIN email_address 
SET DEFAULT 'example@example.com';
```

### 4. Domain deletion

To delete a domain, you can use the `DROP DOMAIN` command. Be careful when doing this, as it will delete the domain even if it is still being used as a data type in a table:

```sql
DROP DOMAIN IF EXISTS email_address CASCADE;
```

By using domains, you can enforce data integrity, validation, and consistency throughout your database, while also making it easier to maintain and refactor your schema.