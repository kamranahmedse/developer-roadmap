# CONCAT

`CONCAT` is a SQL function that allows you to concatenate, or join, two or more strings together. This is extremely useful whenever you need to combine text from multiple columns into a single column.

The syntax for the `CONCAT` function is quite simple:

```sql
CONCAT(string1, string2, ..., string_n)
```

This function accepts as input any number of string arguments, from two to as many as needed, and returns a new string which is the result of all the input strings joined together. The strings are concatenated in the order in which they are passed to the function.

Here's a simple example:

```sql
SELECT CONCAT('Hello', ' ', 'World');
```

This will return the string:

```
'Hello World'
```

You can also use `CONCAT` with columns from a table:

```sql
SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM employees;
```

The above query will return a new column `full_name` which is the result of `first_name` and `last_name` with a space in between. If `first_name` is 'John' and `last_name` is 'Doe', the returned full name would be 'John Doe'.

However, keep in mind that `CONCAT` will return `NULL` if any of the input strings is `NULL`. To avoid this, you can use the `CONCAT_WS` function which accepts a separator as the first argument and then a list of strings to concatenate.

```sql
SELECT CONCAT_WS(' ', first_name, last_name) AS full_name
FROM employees;
```

The `CONCAT_WS` function will ignore any `NULL` values, only joining the non-NULL values with the provided separator. Hence, 'John NULL' would become just 'John'.
