# UPPER

`UPPER()` is a built-in string function in SQL. As the name suggests, it is used to convert all letters in a specified string to uppercase. If the string already consists of all uppercase characters, the function will return the original string.

Syntax for this function is:

```sql
UPPER(string)
```

Here 'string' can be a string value or a column of a table of string(s) type.

Let's assume a table 'students' with column 'name' as below:

| name       |
|------------|
| John Doe   |
| Jane Smith |
| Kelly Will |

If we want all the names in uppercase, we'll use `UPPER()` function as:

```sql
SELECT UPPER(name) as 'Upper Case Name' FROM students;
```

And we will get:

| Upper Case Name |
|----------------|
| JOHN DOE       |
| JANE SMITH     |
| KELLY WILL     |

So, `UPPER()` function helps us to bring an entire string to uppercase for easier comparison and sorting.