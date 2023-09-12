# Data Types in PostgreSQL

PostgreSQL supports a wide range of data types that allow you to store various kinds of information in your database. In this section, we'll take a look at some of the most commonly used data types and provide a brief description of each. This will serve as a useful reference as you work with PostgreSQL.

## Numeric Data Types

PostgreSQL offers several numeric data types to store integers and floating-point numbers:

- **`smallint`**: A 2-byte signed integer that can store numbers between -32,768 and 32,767.
- **`integer`**: A 4-byte signed integer that can store numbers between -2,147,483,648 and 2,147,483,647.
- **`bigint`**: An 8-byte signed integer that can store numbers between -9,223,372,036,854,775,808 and 9,223,372,036,854,775,807.
- **`decimal`**: An exact numeric type used to store numbers with a lot of digits, such as currency values. You can specify the precision and scale for this type.
- **`numeric`**: This is an alias for the `decimal` data type.
- **`real`**: A 4-byte floating-point number with a precision of 6 decimal digits.
- **`double precision`**: An 8-byte floating-point number with a precision of 15 decimal digits.

## Character Data Types

These data types are used to store text or string values:

- **`char(n)`**: A fixed-length character string with a specified length `n`.
- **`varchar(n)`**: A variable-length character string with a maximum length of `n`.
- **`text`**: A variable-length character string with no specified maximum length.

## Binary Data Types

Binary data types are used to store binary data, such as images or serialized objects:

- **`bytea`**: A binary data type that can store variable-length binary strings.

## Date and Time Data Types

PostgreSQL provides different data types to store date and time values:

- **`date`**: Stores date values with no time zone information (YYYY-MM-DD).
- **`time`**: Stores time values with no time zone information (HH:MM:SS).
- **`timestamp`**: Stores date and time values with no time zone information.
- **`timestamptz`**: Stores date and time values including time zone information.
- **`interval`**: Stores a time interval, like the difference between two timestamps.

## Boolean Data Type

A simple data type to represent the truth values:

- **`boolean`**: Stores a true or false value.

## Enumerated Types

You can also create custom data types, known as enumerated types, which consist of a static, ordered set of values:

- **`CREATE TYPE`**: Used to define your custom enumerated type with a list of allowed values.

## Geometric and Network Data Types

PostgreSQL provides special data types to work with geometric and network data:

- **`point`, `line`, `lseg`, `box`, `polygon`, `path`, `circle`**: Geometric data types to store points, lines, and various shapes.
- **`inet`, `cidr`**: Network data types to store IP addresses and subnets.

In summary, PostgreSQL offers a broad range of data types that cater to different types of information. Understanding these data types and how to use them effectively will help you design efficient database schemas and optimize your database performance.

- [An introduction to PostgreSQL data types](https://www.prisma.io/dataguide/postgresql/introduction-to-data-types)