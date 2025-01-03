---
title: String Functions
description: Learn how to manipulate text data using SQL string functions
order: 110
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE customer (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
  );

  INSERT INTO customer (id, name, email)
  VALUES (1, 'john doe', 'john.DOE@example.com'),
         (2, 'JANE SMITH', 'JANE.smith@example.com'),
         (3, 'Alice Johnson', 'alice.johnson@example.com');
  ```
---

String functions are among the most commonly used scalar functions in SQL. They help you manipulate text data in various ways, from simple case changes to complex pattern matching.

Let's look at some of the most common string functions.

## Case Conversion Functions

SQL provides several functions to change the case of text data. These are useful for standardizing data or display formatting:

```sql
-- Convert to uppercase
SELECT UPPER('hello world');     -- Returns: HELLO WORLD

-- Convert to lowercase
SELECT LOWER('HELLO WORLD');     -- Returns: hello world

-- Convert first letter of each word to uppercase
SELECT INITCAP('hello world');   -- Returns: Hello World
```

> Note: MySQL does not support the `INITCAP` function.

## String Length and Extraction

If you need to know the length of a string or extract a portion of it, you can use the following functions:

```sql
-- Get string length
SELECT LENGTH('hello world');     -- Returns: 11

-- Extract substring
SELECT SUBSTRING('hello world', 1, 5);  -- Returns: hello (from 1st character to the 5th character)
SELECT SUBSTRING('hello world', 7);     -- Returns: world (from 7th character to the end)

-- Returns the first `n` characters of a string
SELECT LEFT('hello world', 2);  -- Returns: he

-- Returns the last `n` characters of a string
SELECT RIGHT('hello world', 3);  -- Returns: rld
```

## String Trimming

Trimming functions help remove unwanted spaces or characters from strings. This is particularly useful when cleaning up data:

```sql
-- Remove spaces from both ends
SELECT TRIM(both ' ' from '  hello world  ');   -- Returns: hello world

-- Remove spaces from left
SELECT LTRIM('  hello world  ');  -- Returns: hello world

-- Remove spaces from right
SELECT RTRIM('  hello world  ');  -- Returns: '  hello world'
```

## String Concatenation

SQL provides multiple ways to combine strings. The standard concatenation operator is `||`, though some databases use different operators or functions.

```sql
-- Using concatenation operator
SELECT 'hello' || ' ' || 'world';  -- Returns: hello world

-- Using concat function
SELECT CONCAT('hello', ' ', 'world');  -- Returns: hello world
```

## String Replacement

You can replace parts of strings using various functions. This is useful for data cleaning and formatting:

```sql
-- Replace characters
SELECT REPLACE('hello world', 'o', '0');  -- Returns: hell0 w0rld

-- Pad string with characters
SELECT LPAD('hello', 10, '*');    -- Returns: *****hello
SELECT RPAD('hello', 10, '*');    -- Returns: hello*****
```

## Practical Examples

Given the following `customer` table:

| id  | name          | email                     |
| --- | ------------- | ------------------------- |
| 1   | john doe      | john.DOE@example.com      |
| 2   | JANE SMITH    | JANE.smith@example.com    |
| 3   | Alice Johnson | alice.johnson@example.com |

Let's clean up the data in the `customer` table using string functions we covered in this lesson.

### Standardize Email Addresses

Notice how the email addresses are not in a consistent format in `customer` table. We can use the `LOWER` function to standardize the email addresses to lowercase.

```sql
SELECT
    name,
    LOWER(email) as standardized_email
FROM customer;
```

The output will be:

| name          | standardized_email        |
| ------------- | ------------------------- |
| john doe      | john.doe@example.com      |
| JANE SMITH    | jane.smith@example.com    |
| Alice Johnson | alice.johnson@example.com |

### Extract Domain from Email Address

Let's say that we want to extract the domain from the email address. We can use the `SPLIT_PART` function in PostgreSQL.

```sql
SELECT
    email,
    SPLIT_PART(email, '@', 2) as domain
FROM customer;
```

The output will be:

| email                     | domain      |
| ------------------------- | ----------- |
| john.DOE@example.com      | example.com |
| JANE.smith@example.com    | example.com |
| alice.johnson@example.com | example.com |

> **Note**: MySQL does not support SPLIT_PART function, so we can use the `SUBSTRING_INDEX` function instead.
>
> ```sql
> -- Extract domain from email
> SELECT
>     email,
>     SUBSTRING_INDEX(email, '@', -1) as domain
> FROM customer;
> ```

### Format Names Consistently

Let's say that we want to format the names consistently. We can use the `UPPER` and `LOWER` functions to format the names. `LEFT` to get the first character and `SUBSTRING` to get the rest of the characters.

```sql
-- Format names consistently
SELECT
    name,
    CONCAT(
        UPPER(LEFT(name, 1)),
        LOWER(SUBSTRING(name, 2))
    ) as formatted_name
FROM customer;
```

String functions are particularly useful when you need to standardize data or extract specific parts of strings, clean up user input, or generate formatted output.

In the next lesson, let's explore some numeric functions for mathematical operations.
