# Procedures and Functions in PostgreSQL

In PostgreSQL, you can create stored procedures and functions to perform complex tasks using SQL and PL/pgSQL language. These are also known as *routines*. In this section, we'll discuss the basics of creating, using, and managing procedures and functions in PostgreSQL.

### Functions

A function is a named, reusable piece of code that can be called with input parameters and returns a single value or a table. Functions can be written in various languages like PL/pgSQL, PL/Tcl, and others.

To create a function, you use the `CREATE FUNCTION` statement:

```sql
CREATE FUNCTION function_name(parameter_list)
RETURNS data_type
LANGUAGE language_name
AS $$
-- function code
$$;
```

For example, a simple function that takes two integers as arguments and returns their sum:

```sql
CREATE FUNCTION add(a INTEGER, b INTEGER)
RETURNS INTEGER
LANGUAGE PL/pgSQL
AS $$
BEGIN
    RETURN a + b;
END;
$$;
```

To call a function, you use the `SELECT` statement:

```sql
SELECT add(1, 2);  -- returns 3
```

### Procedures

A procedure is similar to a function, but it doesn't return a value. Instead, it is used to perform actions such as modifying data in the database. In PostgreSQL, you use the `CREATE PROCEDURE` statement to create a procedure:

```sql
CREATE PROCEDURE procedure_name(parameter_list)
LANGUAGE language_name
AS $$
-- procedure code
$$;
```

For example, a simple procedure to insert data into a table:

```sql
CREATE PROCEDURE insert_data(first_name VARCHAR(50), last_name VARCHAR(50))
LANGUAGE PL/pgSQL
AS $$
BEGIN
    INSERT INTO people (first_name, last_name) VALUES (first_name, last_name);
END;
$$;
```

To call a procedure, you use the `CALL` statement:

```sql
CALL insert_data('John', 'Doe');
```

### Managing Routines

You can manage your routines using the following statements:

- `ALTER FUNCTION/PROCEDURE`: Modify the definition of an existing function or procedure
- `DROP FUNCTION/PROCEDURE`: Remove a function or procedure from the database

For example:

```sql
ALTER FUNCTION add(a INTEGER, b INTEGER)
    RENAME TO add_numbers;
    
DROP FUNCTION add_numbers(a INTEGER, b INTEGER);
```

In this section, we've covered the basics of creating, using, and managing procedures and functions in PostgreSQL. These routines can help you simplify your code, improve maintainability, and optimize performance.