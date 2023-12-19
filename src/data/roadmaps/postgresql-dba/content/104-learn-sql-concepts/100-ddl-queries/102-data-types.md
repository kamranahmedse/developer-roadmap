# Data Types in PostgreSQL

In PostgreSQL, data types are used to specify what kind of data is allowed in a particular column of a table. Choosing the right data type is important for ensuring data integrity and optimizing performance.

## Numeric Types

- `INTEGER`: Used to store whole numbers in the range -2147483648 to 2147483647.
- `BIGINT`: Used for storing larger whole numbers in the range -9223372036854775808 to 9223372036854775807.
- `REAL`: Used for storing approximate 6-digit decimal values.
- `DOUBLE PRECISION`: Used for storing approximate 15-digit decimal values.
- `NUMERIC(precision, scale)`: Used for storing exact decimal values, where **precision** defines the total number of digits and **scale** defines the number of digits after the decimal point.

## Character Types

- `CHAR(n)`: Fixed-length character string with a specified length **n** (1 to 10485760).
- `VARCHAR(n)`: Variable-length character string with a maximum length **n** (1 to 10485760).
- `TEXT`: Variable-length character string with no specified limit.

## Date/Time Types

- `DATE`: Stores only date values (no time) in the format 'YYYY-MM-DD'.
- `TIME`: Stores only time values (no date) in the format 'HH:MI:SS'.
- `TIMESTAMP`: Stores both date and time values in the format 'YYYY-MM-DD HH:MI:SS'.
- `INTERVAL`: Stores a duration or interval, e.g., '2 hours', '3 days', '1 month', etc.

## Boolean Type

- `BOOLEAN`: Stores either `TRUE` or `FALSE`.

## Enumerated Types

Enumerated types are user-defined data types that consist of a static, ordered set of values. The syntax for creating an enumerated type is:

```sql
CREATE TYPE name AS ENUM (value1, value2, value3, ...);
```

## JSON Types

- `JSON`: Stores JSON data as a string.
- `JSONB`: Stores JSON data in a binary format for faster processing and querying.

## Array Types

Arrays are one-dimensional or multi-dimensional structures that can store multiple values of the same data type. To define an array, simply use the base data type followed by square brackets `[]`.

## Geometric Types

PostgreSQL supports various geometric types for storing points, lines, and polygons.

- `POINT`: Represents a geometric point with two coordinates (x, y).
- `LINE`: Represents a line with a start and an end point.
- `POLYGON`: Represents a closed geometric shape with multiple points.

## Network Address Types

- `CIDR`: Stores an IPv4 or IPv6 network address and its subnet mask.
- `INET`: Stores an IPv4 or IPv6 host address with an optional subnet mask.
- `MACADDR`: Stores a MAC address (6-byte hardware address).

## Bit Strings

- `BIT(n)`: Fixed-length bit field with a specified length **n**.
- `BIT VARYING(n)`: Variable-length bit field with a maximum length **n**.

Now that you are familiar with the different data types available in PostgreSQL, make sure to choose the appropriate data type for each column in your tables to ensure proper storage and performance.