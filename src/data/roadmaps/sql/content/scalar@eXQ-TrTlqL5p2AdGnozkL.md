# Scalar

In SQL, a scalar type is a type that holds a single value as opposed to composite types that hold multiple values. In simpler terms, scalar types represent a single unit of data.

Some common examples of scalar types in SQL include:

- Integers (`INT`)
- Floating-point numbers (`FLOAT`)
- Strings (`VARCHAR`, `CHAR`)
- Date and Time (`DATE`, `TIME`)
- Boolean (`BOOL`)

## Examples

Here is how you can define different scalar types in SQL:

## Integers

An integer can be defined using the INT type. Here is an example of how to declare an integer:

```sql
CREATE TABLE Employees (
    EmployeeID INT,
    FirstName VARCHAR(50),
    LastName VARCHAR(50)
);
```

## Floating-Point Numbers

Floating-point numbers can be defined using the FLOAT or REAL type. Here is an example of how to declare a floating-point number:

```sql
CREATE TABLE Products (
    ProductID INT,
    Price FLOAT
);
```

## Strings

Strings can be defined using the CHAR, VARCHAR, or TEXT type. Here is an example of how to declare a string:

```sql
CREATE TABLE Employees (
    EmployeeID INT,
    FirstName VARCHAR(50), 
    LastName VARCHAR(50) 
);
```

## Date and Time

The DATE, TIME or DATETIME type can be used to define dates and times:

```sql
CREATE TABLE Orders (
    OrderID INT,
    OrderDate DATE
);
```

## Boolean

Booleans can be declared using the BOOL or BOOLEAN type. They hold either `TRUE` or `FALSE`.

```sql
CREATE TABLE Employees (
    EmployeeID INT,
    IsActive BOOL
);
```

Remember, the way these types are declared might slightly differ based on the SQL dialect you are using. It's crucial to refer to the specific documentation of the SQL flavor you're working with for the precise syntax and behavior.