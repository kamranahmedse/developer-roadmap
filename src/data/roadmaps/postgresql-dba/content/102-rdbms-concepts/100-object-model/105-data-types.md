# Data Types

# Data Types in PostgreSQL

As a PostgreSQL Database Administrator (DBA), it's essential to understand the various data types that can be used when designing and maintaining databases. This section provides an overview of the main data types used in PostgreSQL and some examples of how they can be utilized.

## Numeric Data Types

These are used for storing numeric values (integers and decimals). PostgreSQL has several types of numeric data types.

### Integer Types:

- `smallint`: 2-byte integer with a range of -32,768 to 32,767.
- `integer`: 4-byte integer with a range of -2,147,483,648 to 2,147,483,647. Also known as `int`.
- `bigint`: 8-byte integer with a range of -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807.

### Decimal/Floating Point types:

- `decimal`: Variable precision with optional scale, exact numeric value storage. Also known as `numeric`.
- `real`: 4-byte floating-point number, 6 decimal digits precision. Also known as `float4`.
- `double precision`: 8-byte floating-point number, 15 decimal digits precision. Also known as `float8`.

## Character Data Types

These data types are used for storing text or string values.

- `character(n)`: Fixed-length character string, padded with spaces if necessary. Also known as `char(n)`.
- `character varying(n)`: Variable-length character string with a maximum length of `n`. Also known as `varchar(n)`.
- `text`: Variable-length character string with unlimited length.

## Binary Data Types

Used for storing binary data, such as images or serialized objects.

- `bytea`: Variable-length binary string.

## Date and Time Data Types

These data types are used for storing date, time, and interval values.

- `date`: Stores dates with the range from 4713 BC to 5874897 AD.
- `time`: Stores time of day without time zone information.
- `time with time zone`: Stores time of day including time zone information.
- `timestamp`: Stores date and time without time zone information.
- `timestamp with time zone`: Stores date and time including time zone information.
- `interval`: Represents a time span. Can be used to add or subtract from `timestamp`, `time`, and `date` data types.

## Enumeration Data Types

Create custom data types that consist of a static, ordered set of values.

- `enum`: User-defined enumeration consisting of a static, ordered set of values.

## Geometric Data Types

Used for storing geometric or spatial data, such as points, lines, and polygons.

- `point`: Represents a two-dimensional point (x, y).
- `line`: Represents a two-dimensional line.
- `lseg`: Represents a two-dimensional line segment.
- `box`: Represents a two-dimensional rectangular box.
- `circle`: Represents a two-dimensional circle.
- `polygon`: Represents a two-dimensional closed path with an arbitrary number of points.

## Network Address Data Types

Store Internet Protocol (IP) addresses and subnet masks.

- `cidr`: Stands for "Classless Inter-Domain Routing." Stores network IP addresses and subnet masks.
- `inet`: Stores IP addresses for both IPv4 and IPv6, along with an optional subnet mask.
- `macaddr`: Stores Media Access Control (MAC) addresses for network interfaces.

## Bit Strings Data Types

Store fixed or variable length bit strings.

- `bit(n)`: A fixed-length bit string with a length of `n` bits.
- `bit varying(n)`: A variable-length bit string with a maximum length of `n` bits. Also known as `varbit(n)`.

## UUID Data Type

- `uuid`: Stores Universally Unique Identifiers (UUID) - 128-bit values.

## JSON Data Types

Store JSON (JavaScript Object Notation) and JSONB (Binary JSON) data types for more complex data structures.

- `json`: Stores JSON data as plain text.
- `jsonb`: Stores JSON data in a binary format.

Knowing and understanding these data types allows the DBA to design efficient and accurate database schemas, select the appropriate data type for each column, and optimize performance.