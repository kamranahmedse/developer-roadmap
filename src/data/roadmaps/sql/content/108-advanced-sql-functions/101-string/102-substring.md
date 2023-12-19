# SUBSTRING

The SQL `SUBSTRING` function is used to extract a part of a string, where you can specify the start position and the length of the text. This function can be very beneficial when you only need a specific part of a string. 

## Syntax

The standardized SQL syntax for `SUBSTRING` is as follows:

```sql
SUBSTRING(string, start, length)
```

Where:

- `string` is the source string from which you want to extract.
- `start` is the position to start extraction from. The first position in the string is always 1.
- `length` is the number of characters to extract.

## Usage

For instance, if you want to extract the first 5 characters from the string 'Hello World':

```sql
SELECT SUBSTRING('Hello World', 1, 5) as ExtractedString;
```

Result:

```sql
| ExtractedString |
| --------------- |
| Hello           |
```

You can also use `SUBSTRING` on table columns, like so:

```sql
SELECT SUBSTRING(column_name, start, length) FROM table_name;
```

## SUBSTRING with FROM and FOR 

In some database systems (like PostgreSQL and SQL Server), the `SUBSTRING` function uses a different syntax:

```sql
SUBSTRING(string FROM start FOR length)
```

This format functions the same way as the previously mentioned syntax.

For example:

```sql
SELECT SUBSTRING('Hello World' FROM 1 FOR 5) as ExtractedString;
```

This would yield the same result as the previous example - 'Hello'.

## Note

SQL is case-insensitive, meaning `SUBSTRING`, `substring`, and `Substring` will all function the same way. 