# Data Types

# Data Types in PostgreSQL

In PostgreSQL, a Data Type defines the type of data that can be stored in a column. Understanding data types is essential for designing your database schema and ensuring the correct storage and retrieval of data. In this section, we'll cover some of the most common data types in PostgreSQL.

## Numeric Data Types

PostgreSQL supports several numeric data types for integers and floating-point numbers.

### Integer Data Types

- **Small Integer (smallint):** Stores whole numbers ranging from -32,768 to 32,767, occupying 2 bytes of storage.
- **Integer (integer/int):** Stores whole numbers ranging from -2,147,483,648 to 2,147,483,647, occupying 4 bytes of storage.
- **Big Integer (bigint):** Stores whole numbers ranging from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807, occupying 8 bytes of storage.

### Floating-Point Data Types

- **Real (real/float4):** Stores floating-point numbers with 6 decimal digits precision, occupying 4 bytes of storage.
- **Double Precision (double precision/float8):** Stores floating-point numbers with 15 decimal digits precision, occupying 8 bytes of storage.
- **Numeric (numeric/decimal):** Stores exact numeric values with user-defined precision up to 131,072 digits and 16,383 decimals, occupying variable storage.

## Character Data Types

PostgreSQL provides several types of textual data types to store strings of varying lengths.

- **Character Varying (varchar(n)):** Stores strings of variable length with a user-defined maximum length of `n` characters. If not specified, the length is unlimited.
- **Character (char(n)):** Stores fixed-length strings of exactly `n` characters. If the input string is shorter, it gets padded with spaces.
- **Text (text):** Stores strings of variable length with no limit.

## Date and Time Data Types

PostgreSQL offers various data types for date and time information management.

- **Date (date):** Stores only the date with no time data.
- **Time (time [without time zone]):** Stores time without any date or timezone data.
- **Timestamp (timestamp [without time zone]):** Stores both date and time without timezone data.
- **Time with Time Zone (time [with time zone] / timestamptz):** Stores both date and time with timezone data.

## Boolean Data Type

- **Boolean (boolean/bool):** Stores either true, false, or null values.

## Enumerated Data Type

- **Enum (enum):** Stores a predefined static, ordered set of values. You must create the enum type before using it.

## UUID Data Type

- **UUID (uuid):** Stores universally unique identifiers (UUIDs) represented as 32 hexadecimal characters (16 bytes).

## JSON Data Types

PostgreSQL provides two data types for storing JSON data.

- **JSON (json):** Stores JSON data in a flexible format, allowing arbitrary queries and manipulation.
- **JSONB (jsonb):** Stores JSON data in a binary format, offering faster query performance compared to JSON.

## Array Data Type

- **Array (any_array):** Stores an ordered collection of data of the same data type. You can define arrays for any supported data type.

## Special Data Types

PostgreSQL offers some special data types that are worth mentioning:

- **Interval (interval):** Represents a time duration.
- **Bit (bit(n)):** Stores a fixed-length bit string of size `n`.
- **Bit Varying (bit varying(n)/varbit(n)):** Stores a variable-length bit string with a user-defined maximum length of `n`.
- **Serial Types (serial, smallserial, bigserial):** Used for auto-incrementing integer columns.

Understanding data types is crucial to creating efficient and accurate database schemas in PostgreSQL. Be sure to choose the appropriate data type for each column to ensure the best possible performance and data validation.