# REPLACE

You can use the `REPLACE()` function in SQL to substitute all occurrences of a specified string.

**Synopsis**

`REPLACE(input_string, string_to_replace, replacement_string)`

**Parameters**

- `input_string`: This is the original string where you want to replace some characters.
- `string_to_replace`: This is the string that will be searched for in the original string.
- `replacement_string`: This is the string that will replace the `string_to_replace` in the original string.

The `REPLACE()` function is handy when it comes to manipulating and modifying data in various ways, particularly when used in combination with other SQL data-manipulation functions.

**Examples**

Suppose we have the following table, `Employees`:

| EmpId | EmpName             |
|-------|---------------------|
| 1     | John Doe            |
| 2     | Jane Doe            |
| 3     | Jim Smith Doe       |
| 4     | Jennifer Doe Smith  |

Here's how you can use the `REPLACE()` function:

```sql
SELECT EmpId, EmpName,
REPLACE(EmpName, 'Doe', 'Roe') as ModifiedName
FROM Employees;
```

After the execution of the above SQL, we will receive:

| EmpId | EmpName            | ModifiedName        |
|-------|--------------------|---------------------|
| 1     | John Doe           | John Roe            |
| 2     | Jane Doe           | Jane Roe            |
| 3     | Jim Smith Doe      | Jim Smith Roe       |
| 4     | Jennifer Doe Smith | Jennifer Roe Smith  |

You can see that all occurrences of 'Doe' are replaced with 'Roe'.