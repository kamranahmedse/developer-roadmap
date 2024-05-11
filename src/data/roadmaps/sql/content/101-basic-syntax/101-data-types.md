# Data Types

SQL data types define the type of data that can be stored in a database table's column. Depending on the DBMS, the names
of the data types can differ slightly. Here are the general types:

## INT

`INT` is used for whole numbers. For example:

```sql
CREATE TABLE Employees (
    ID INT,
    Name VARCHAR(30)
);
```

## DECIMAL

`DECIMAL` is used for decimal and fractional numbers. For example:

```sql
CREATE TABLE Items (
    ID INT,
    Price DECIMAL(5,2)
);
```

## CHAR

`CHAR` is used for fixed-length strings. For example:

```sql
CREATE TABLE Employees (
    ID INT,
    Initial CHAR(1)
);
```

## VARCHAR

`VARCHAR` is used for variable-length strings. For example:

```sql
CREATE TABLE Employees (
    ID INT,
    Name VARCHAR(30)
);
```

## DATE

`DATE` is used for dates in the format (`YYYY-MM-DD`).

```sql
CREATE TABLE Employees (
    ID INT,
    BirthDate DATE
);
```

## DATETIME

`DATETIME` is used for date and time values in the format (`YYYY-MM-DD HH:MI:SS`).

```sql
CREATE TABLE Orders (
    ID INT,
    OrderDate DATETIME
);
```

## BINARY

`BINARY` is used for binary strings.

## BOOLEAN

`BOOLEAN` is used for boolean values (`TRUE` or `FALSE`).

**Remember**, the specific syntax for creating tables and defining column data types can vary slightly depending upon
the SQL database you are using (MySQL, PostgreSQL, SQL Server, SQLite, Oracle, etc.), but the general concept and
organization of data types is cross-platform.
