# LOWER

`LOWER` is a built-in function in SQL used to return all uppercase character(s) in a string to lowercase. It can be quite useful when performing case-insensitive comparisons or searches in your queries.

## Syntax:

The basic syntax for `LOWER` in SQL is:

```
LOWER(string)
```

Here, 'string' can be a literal string or a column of a table, and the function will return the string with all alphabetic characters converted to lowercase.

## Example:

Let's take a look at a very basic example. Assuming we have the following string "SQL is BAE!" and we want to convert it to lower case.

```sql
SELECT LOWER('SQL is BAE!') AS LowerCaseString;
```

Output:
```sql
lowercasestring
----------------
sql is bae!
```

If you are using a column from a table, let's say we have a table 'students' with a column 'Name' and we want to convert all the entries in that column to lowercase:

```sql
SELECT LOWER(Name) AS LowerCaseName FROM students;
```

Here, the LOWER function will return all the names from the 'Name' column in the 'students' table in their lowercase forms.

Remember, the `LOWER` function doesn't affect the numbers and special characters in the input string, it only converts uppercase alphabetical characters to lowercase.