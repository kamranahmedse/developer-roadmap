# Overview

PostgreSQL is an object-relational database management system (ORDBMS). That means it combines features of both relational (RDBMS) and object-oriented databases (OODBMS). The object model in PostgreSQL provides features like user-defined data types, inheritance, and polymorphism, which enhances its capabilities beyond a typical SQL-based RDBMS.

## User-Defined Data Types

One of the core features of the object model in PostgreSQL is the ability to create user-defined data types. User-defined data types allow users to extend the base functionality and use PostgreSQL to store complex and custom data structures. 

These data types are known as Composite Types, which are created using the `CREATE TYPE` SQL command. For example, you can create a custom type for a 3D point:

```sql
CREATE TYPE point_3d AS (
    x REAL,
    y REAL,
    z REAL
);
```

## Inheritance

Another element of the object model in PostgreSQL is table inheritance. This feature allows you to define a table that inherits the columns, data types, and constraints of another table. Inheritance in PostgreSQL is a powerful mechanism to organize and reuse common data structures across multiple tables.

The syntax for creating a table that inherits another table is as follows:

```sql
CREATE TABLE child_table_name ()
    INHERITS (parent_table_name);
```

For example, consider a base table `person`:

```sql
CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    dob DATE
);
```

You can create an `employee` table that inherits the attributes of `person`:

```sql
CREATE TABLE employee ()
    INHERITS (person);
```

The `employee` table now has all the columns of the `person` table, and you can add additional columns or constraints specific to the `employee` table.

## Polymorphism

Polymorphism is another valuable feature of the PostgreSQL object model. Polymorphism allows you to create functions and operators that can accept and return multiple data types. This flexibility enables you to work with a variety of data types conveniently.

In PostgreSQL, two forms of polymorphism are supported:

- Polymorphic Functions: Functions that can accept and return multiple data types.
- Polymorphic Operators: Operators, which are essentially functions, that can work with multiple data types.

For example, consider the following function which accepts anyelement type:

```sql
CREATE FUNCTION simple_add(x anyelement, y anyelement) RETURNS anyelement
    AS 'SELECT x + y;'
    LANGUAGE SQL;
```

This function can work with any data type that supports the addition operator.