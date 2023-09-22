# String Functions

In SQL, you can perform various operations on strings, including extracting a string, combining two or more strings, and converting a case of a string.

## CONCAT Function

The CONCAT function combines two or more strings into one string. The following is the syntax:

```sql
CONCAT(string1, string2, ...., string_n)
```

Example:

```sql
SELECT CONCAT('Hello ', 'World');
```

The output of the above SQL statement will be 'Hello World'.

## SUBSTRING Function

The SUBSTRING function extracts a string from a given string. The syntax looks as follows:

```sql
SUBSTRING(string, start, length)
```

Example:

```sql
SELECT SUBSTRING('SQL Tutorial', 1, 3);
```

The output of the above query will be 'SQL'.

## LENGTH Function

The LENGTH function returns the length of a string. The syntax is:

```sql
LENGTH(string)
```

Example:

```sql
SELECT LENGTH('Hello World');
```

The output of the above SQL statement will be 11.

## UPPER and LOWER Function

The UPPER function converts all the letters in a string to uppercase, whereas the LOWER function to lowercase. 

Syntax:

```sql
UPPER(string)

LOWER(string)
```

Examples:

```sql
SELECT UPPER('Hello World');

SELECT LOWER('Hello World');
```
The output of the above SQL statements will be 'HELLO WORLD' and 'hello world' respectively.

## TRIM Function

The TRIM function removes leading and trailing spaces of a string. You can also remove other specified characters.

Syntax:

```sql
TRIM([LEADING|TRAILING|BOTH] [removal_string] FROM original_string)
```

Example:

```sql
SELECT TRIM('   Hello World   ');
SELECT TRIM('h' FROM 'hello');
```

The output of the first query will be 'Hello World' and that of the second query will be 'ello'.