# PL/pgSQL - Procedural Language for PostgreSQL

`PL/pgSQL` is a procedural language for the PostgreSQL database system that enables you to create stored procedures and functions using conditionals, loops, and other control structures, similar to a traditional programming language.

## Why PL/pgSQL?

Using PL/pgSQL, you can perform complex operations on the server-side, reducing the need to transfer data between the server and client. This can significantly improve performance, and it enables you to encapsulate and modularize your logic within the database.

## Language Features

Here are some of the key features of PL/pgSQL:

* Easy to learn for those familiar with other procedural languages, such as PL/SQL (Oracle) or T-SQL (Microsoft SQL Server)
* Provides standard programming constructs like variables, loops, conditionals, and exception handling
* Supports the use of cursors for traversing query results
* Can call other stored procedures and functions
* Enables returning single values or result-sets as output
* Highly extensible and supports custom user-defined data types
* Offers transaction control within the code

## Creating Functions in PL/pgSQL 

To create a new function, you use the `CREATE FUNCTION` statement. Here's a simple example of a PL/pgSQL function:

```sql
CREATE FUNCTION add_numbers(integer, integer)
RETURNS integer AS $$
DECLARE
  sum integer;
BEGIN
  sum := $1 + $2;
  RETURN sum;
END;
$$ LANGUAGE plpgsql;
```

This function takes two integers as input parameters and returns their sum.

## Using Functions inQueries

You can use functions within queries like any other PostgreSQL function:

```sql
SELECT add_numbers(5, 10);
```

This query would return `15`.

## Error Handling and Exception Catches

PL/pgSQL supports error handling through the use of `EXCEPTION` blocks. Here's an example of a function that handles division by zero:

```sql
CREATE FUNCTION safe_divide(numerator integer, denominator integer)
RETURNS integer AS $$
DECLARE
  result integer;
BEGIN
  result := numerator / denominator;
  RETURN result;
EXCEPTION WHEN division_by_zero THEN
  RAISE WARNING 'Division by zero occurred. Returning NULL';
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;
```

## Triggers and PL/pgSQL

You can also create triggers using PL/pgSQL. Triggers are user-defined functions that are invoked automatically when an event such as insert, update or delete occurs.

Here's an example of a trigger function that logs the change of user's email address:

```sql
CREATE FUNCTION log_email_change()
RETURNS trigger AS $$
BEGIN
  IF NEW.email <> OLD.email THEN
    INSERT INTO user_email_changes (user_id, old_email, new_email)
    VALUES (OLD.user_id, OLD.email, NEW.email);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

## Conclusion

PL/pgSQL is a powerful and versatile procedural language that brings traditional programming constructs to the PostgreSQL database. It enables you to perform complex operations on the server-side and is particularly useful for creating stored procedures, functions, and triggers.