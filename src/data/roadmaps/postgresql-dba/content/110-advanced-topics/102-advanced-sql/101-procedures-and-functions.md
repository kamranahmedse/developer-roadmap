# Procedures and Functions

# Procedures and Functions

In this section, we are going to discuss procedures and functions, two powerful tools for database administrators and developers in PostgreSQL. Procedures and functions are routines written using SQL or other procedural languages like PL/pgsql, which can be called/invoked to perform various tasks within the database. They allow you to encapsulate complex business logic, operations, and computations into reusable and manageable components. 

## Procedures

Procedures, also known as Stored Procedures, were introduced in PostgreSQL 11. They are named groups of SQL statements and other control structures that can be executed on-demand. The primary difference between procedures and functions is that procedures do not return a value (except for out parameters) and support transaction control statements like COMMIT and ROLLBACK. 

Some key features of procedures are:

- Can be written in SQL or other procedural languages like PL/pgSQL, PL/Tcl, PL/Python, etc.
- Can have input, output, and input/output parameters.
- Can perform operations with side effects, which are not allowed in functions (e.g., modifying the database schema).
- Support transaction control statements like COMMIT and ROLLBACK for better control over the database.

Creating a procedure:
```
CREATE PROCEDURE procedure_name(parameter_list)
LANGUAGE language_name
AS $$
-- Procedure body
$$;
```
Calling a procedure:
```
CALL procedure_name(argument_list);
```

## Functions

Functions, also known as User-Defined Functions (UDFs) or Stored Functions, are similar to procedures but have some differences in their behavior and capabilities. Functions return a single value or a table (set of rows) as output and do not support transaction control statements.

Some key features of functions are:

- Can be written in SQL or other procedural languages like PL/pgSQL, PL/Tcl, PL/Python, etc.
- Can have input and output parameters. The return type can be scalar, composite, or set of rows (table).
- Can be used in SQL queries like any other built-in function.
- Immutable, stable or volatile functions can be created providing additional control over function execution.

Creating a function:
```
CREATE FUNCTION function_name(parameter_list)
RETURNS return_type
LANGUAGE language_name
AS $$
-- Function body
$$;
```
Calling a function:
```
SELECT function_name(argument_list);
```

In this section, we discussed the differences between Procedures and Functions in PostgreSQL, their features, and how to create and call them. These features provide immense power to the PostgreSQL database, and mastering them is essential for any PostgreSQL DBA or developer.