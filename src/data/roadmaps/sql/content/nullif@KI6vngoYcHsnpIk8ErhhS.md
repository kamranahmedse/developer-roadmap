# NULLIF

`NULLIF` is a built-in conditional function in SQL Server. The `NULLIF` function compares two expressions and returns NULL if they are equal or the first expression if they are not.

## Syntax

Here's the syntax of the `NULLIF` function:

```sql
NULLIF(expression1, expression2);
```
`NULLIF` compares `expression1` to `expression2`. If `expression1` and `expression2` are equal, the function returns NULL. Otherwise, it returns `expression1`. Both expressions must have the same data type.

## Example

Consider the following example:

```sql
SELECT 
    first_name, 
    last_name,
    NULLIF(email, 'NA') AS email
FROM 
    users;
```
In this SQL Server `NULLIF` function example, if the field email is 'NA', then NULL would be returned. Otherwise the actual `email` field value is returned.

In another example, consider a division operation:

```sql
SELECT 
    avg_salary,
    NULLIF(avg_salary, 0) AS avg_salary_no_zero
FROM 
    positions;
```

In this SQL Server `NULLIF` function example, if `avg_salary` field is 0, then NULL would be returned. This is useful to avoid division by zero errors.

In nutshell, the SQL `NULLIF` function can be handy in many scenarios such as to circumvent division by zero errors or to translate known sentinel values into NULL values that can be handled by SQL's NULL handling functions.