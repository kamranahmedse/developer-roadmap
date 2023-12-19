# LENGTH

In SQL, `LENGTH` is a built-in function that allows you to find the number of characters in a string or the length of a string.

Syntax:

```sql
LENGTH ( string )
```
Here, `string` can be any string literal, column or expression resulting in a string.

## Examples

Consider an "employees" table:

| id | first_name | last_name |
|----|------------|-----------|
| 1  | John       | Doe       |
| 2  | Jane       | Smith     |
| 3  | Alice      | Murphy    |

To compute the length of the first_name field for all records, use the following SQL statement:
```sql
SELECT first_name, LENGTH(first_name) as length_of_first_name
FROM employees;
```
Output:

| first_name | length_of_first_name |
|------------|----------------------|
| John       | 4                    |
| Jane       | 4                    |
| Alice      | 5                    |

## Usage with DISTINCT
`LENGTH` can also be used in conjunction with `DISTINCT` to find the number of distinct lengths of a specific field. 
```sql
SELECT DISTINCT LENGTH(first_name) as distinct_length_of_first_name
FROM employees;
```

## Usage with WHERE Clause

It can work in the WHERE clause to return only those records where the length of a specific field meets a certain condition.
```sql
SELECT *
FROM employees
WHERE LENGTH(first_name) > 4;
```

Do note that the `LENGTH` function may return different results in different SQL systems due to character set and collation differences. In some systems, `LENGTH()` returns length in characters while in others it could return length in bytes. 

For example, MySQL has separate `CHAR_LENGTH()` and `LENGTH()` functions. `CHAR_LENGTH()` returns the length of the string in characters, while `LENGTH()` in MySQL returns the length of the string in bytes. This can make a difference if your string includes multibyte characters (like UTF-8). In such scenarios, it's always recommended to be sure how your specific SQL system implements `LENGTH` function.