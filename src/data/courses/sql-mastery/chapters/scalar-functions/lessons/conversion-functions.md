---
title: Conversion Functions
description: Learn how to convert data between different types in SQL
order: 140
type: lesson-challenge
setup: |
  CREATE TABLE raw_data (
      value VARCHAR(255)
  );

  INSERT INTO raw_data (value) 
  VALUES ('123'), 
      ('456.78'), 
      ('abc'), 
      ('123.45'),
      ('true'),
      ('false'),
      ('1'),
      ('0');

  CREATE TABLE imported_sales_data (
      id_string VARCHAR(10),
      product_name VARCHAR(100),
      amount_string VARCHAR(20),
      sale_date VARCHAR(20)
  );

  INSERT INTO imported_sales_data (id_string, product_name, amount_string, sale_date) VALUES
    ('1', 'Laptop', '999.99', '2024-01-15'),
    ('2', 'Mouse', '24.99', '2024-01-16'),
    ('', 'Keyboard', '59.99', '2024-01-17'),
    ('4', 'Monitor', '', '2024-01-18'),
    ('5', 'Headphones', '79.99', ''),
    ('abc', 'USB Drive', '29.99', '2024-01-20'),
    ('7', 'Webcam', 'N/A', '2024-01-21'),
    ('', '', '', ''),
    ('9', 'Printer', '299.99', '2024-01-23'),
    ('10', 'Scanner', '199.99', '2024-01-24');
---

Conversion functions allow you to transform data from one type to another. These functions are essential when you need to ensure data compatibility or format data for specific operations.

## Using CAST

The `CAST` function is the standard SQL way to convert between data types. It's widely supported across all major databases:

```sql
-- Convert string to integer
SELECT CAST('123' AS INTEGER);       -- Returns: 123

-- Convert string to decimal
SELECT CAST('123.45' AS DECIMAL(10,2));  -- Returns: 123.45

-- Convert number to string
SELECT CAST(123.45 AS VARCHAR);      -- Returns: '123.45'

-- Convert string to date
SELECT CAST('2024-03-15' AS DATE);   -- Returns: 2024-03-15

-- Convert string to timestamp
SELECT CAST('2024-03-15T12:00:00' AS TIMESTAMP);
```

## Regex Checking

When converting data, it's important to handle potential errors.

In the following example, we're using a regex pattern to check if the value is an integer. If it is, we'll cast it to an integer. If it's not, we'll return `NULL`.

```sql
-- Using CASE to handle invalid conversions
SELECT
    CASE
        -- Checking value against the regex pattern for integers
        WHEN value ~ '^[0-9]+$' THEN CAST(value AS INTEGER)
        ELSE NULL
    END AS safe_integer
FROM raw_data;
```

> **Note**: The `~` operator is used to check if the value matches the regex pattern for integers. This is a PostgreSQL-specific operator.

## Numeric Conversions

When working with numbers in different formats:

```sql
-- Convert percentage string to decimal
SELECT CAST(REPLACE('15%', '%', '') AS DECIMAL(5,2)) / 100.0;
-- Returns: 0.15
```

## Date Conversions

Converting between different date formats:

```sql
-- Convert string dates to date type
SELECT
    CAST('2024-03-15' AS DATE) AS standard_date,
    CAST('03/15/2024' AS DATE) AS us_date,
    CAST('15-Mar-2024' AS DATE) AS custom_date;

-- Convert date to different string format
SELECT TO_CHAR(
    CAST('2024-03-15' AS DATE),
    'Month DD, YYYY'
) AS formatted_date;
```

## Boolean Conversions

Converting various values to boolean:

```sql
-- Convert strings/numbers to boolean
SELECT
    CAST('true' AS BOOLEAN),     -- Returns: true
    CAST('1' AS BOOLEAN),        -- Returns: true
    CAST('false' AS BOOLEAN),    -- Returns: false
    CAST('0' AS BOOLEAN);        -- Returns: false
```

> **Note**: While `CAST` is standard SQL, some databases offer alternative syntax. For example, PostgreSQL supports the `::` operator (`'123'::integer`), and SQL Server supports the `CONVERT` function. The handling of invalid conversions also varies between databases. Always check your database's documentation for specific behavior and best practices.

In the next lesson, we'll explore logical functions for handling conditional operations.
