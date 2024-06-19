# LENGTH

In SQL, `LENGTH` is a built-in function that allows you to find the number of characters in a string or the length of a string.

Syntax:

```sql
LENGTH ( string )
```
Here, `string` can be any string literal, column or expression resulting in a string.

## Examples
Here are a few examples demonstrating how the `LENGTH()` function works in MySQL:
### Example 1: Basic Usage
```sql
SELECT LENGTH('Hello, World!');
Consider an "employees" table:
```
This will return `13` because there are 13 bytes in the string "Hello, World!".

### Example 2: Multi-byte Characters
If your string contains multi-byte characters, `LENGTH()` will count the total number of bytes.
```sql
SELECT LENGTH('你好, 世界!');
```

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

Differences with `CHAR_LENGTH()`
To understand the difference better, consider the following example:

```sql
SELECT LENGTH('こんにちは') AS byte_length, CHAR_LENGTH('こんにちは') AS char_length;
```
Assuming the string is stored in UTF-8, こんにちは (which means "Hello" in Japanese) 
consists of 5 characters, each of which takes 3 bytes. Therefore:
- `LENGTH('こんにちは')` returns 15 (because 5 characters * 3 bytes = 15 bytes).
- `CHAR_LENGTH('こんにちは')` returns 5 (because there are 5 characters).

## Practical Considerations
- Use `LENGTH()` when you need to know the storage size or the number of bytes.
- Use `CHAR_LENGTH()` when you need to know the number of characters, especially for multi-byte character sets.

## Conclusion
The `LENGTH()` function in MySQL is a useful tool for working with strings, particularly when dealing with byte-level operations. It is crucial to understand the difference between byte length and character length to avoid potential bugs and to ensure that your applications handle string data correctly.
