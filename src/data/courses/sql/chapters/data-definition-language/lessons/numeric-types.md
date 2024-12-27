---
title: More on Numeric Types
description: Learn about common data types in SQL.
order: 130
type: lesson
---

In our previous lesson we only covered some basic data types for the numeric category. We also did not go into the details of how much space each data type takes up in the database and how to store numbers in a way that is more space efficient.

In this lesson we will cover more data types for the numeric category and look at some other standard SQL data types.

## Numeric Data Types

Numeric data types can be further categorized into two types:

| Category    | Description                                                                     |
| ----------- | ------------------------------------------------------------------------------- |
| Exact       | Numbers that can be represented and retrieved exactly from the database         |
| Approximate | Numbers that are not exact and can be represented approximately in the database |

It might be confusing to understand the difference between exact and approximate numbers at first. I will try to explain it in a simple way and hopefully make it clear by the end of this lesson.

> As a developer, you will mostly be dealing with exact numbers, so don't worry too much about approximate numbers for now.

### Exact Numerics

Exact numbers that can be represented exactly in the database i.e. what you store in the database is exactly what you get back when you retrieve it.

They can be further categorized into two types:

| Category | Description                                                 |
| -------- | ----------------------------------------------------------- |
| Integer  | Numbers without any fractional part e.g. `112`, `283`, etc. |
| Decimal  | Numbers with fractional parts e.g. `112.34`, `283.01` etc.  |

Let's look at the data types in each category.

### Integers

Integers are whole numbers without any fractional part e.g. `112`, `283`, `118`, etc. In standard SQL, there are three integer data types each with different storage space and range of values it can store.

| Type       | Storage | Min and Max Values it can store                                  |
| ---------- | ------- | ---------------------------------------------------------------- |
| `INTEGER`  | 4 bytes | From `-2,147,483,648` to `2,147,483,647`                         |
| `BIGINT`   | 8 bytes | From `-9,223,372,036,854,775,808` to `9,223,372,036,854,775,807` |
| `SMALLINT` | 2 bytes | From `-32,768` to `32,767`                                       |

Some databases have implemented some additional non-standard datatypes. Here are some examples:

| Type        | Storage | Min and Max Values it can store                                  |
| ----------- | ------- | ---------------------------------------------------------------- |
| `TINYINT`   | 1 byte  | From `-128` to `127`                                             |
| `MEDIUMINT` | 3 bytes | From `-8,388,608` to `8,388,607`                                 |
| `BIGINT`    | 8 bytes | From `-9,223,372,036,854,775,808` to `9,223,372,036,854,775,807` |

Have a look at this [PostgreSQL documentation](https://www.postgresql.org/docs/current/datatype-numeric.html#DATATYPE-NUMERIC) and [MySQL documentation](https://dev.mysql.com/doc/refman/8.4/en/integer-types.html) for all the numeric data types supported by PostgreSQL and MySQL.

### Decimals

Decimal numbers have two parts:

- The total number of digits
- The number of digits to the right of the decimal point

For example, the number `112.34` has 5 digits in total and 2 digits after the decimal point. There are two decimal data types in standard SQL. Both have the same name and behave the same way. Here is how they are used in SQL statements:

```sql
DECIMAL(total_digits, digits_after_decimal)
NUMERIC(total_digits, digits_after_decimal)
```

The `total_digits` parameter specifies the total number of digits in the number. The `digits_after_decimal` parameter is optional and specifies the number of digits to the right of the decimal point. If not specified, the number of digits after the decimal point is `0`.

> Note that I have used the terms `total_digits` and `digits_after_decimal` to make it easier to understand. But a proper term for `total_digits` is `precision` and for `digits_after_decimal` is `scale`.

For example, the following SQL statement creates a table with a column `price` that can store decimal numbers with up to 4 digits in total and 2 digits after the decimal point:

```sql
CREATE TABLE products (
  id INT,
  price DECIMAL(4, 2)
);
```

If you try to insert a number with more than 4 digits in total or more than 2 digits after the decimal point, you will get an error or unexpected results depending on the database you are using.

```sql
-- 23.123 will be rounded to 23.12 because it can't
-- store more than 2 digits after the decimal point
INSERT INTO products (id, price)
VALUES (1, 23.123);
```

Regarding the error or rounding, it depends on the database you are using. I would recommend you to check the documentation of the database you are using to understand how it handles errors and rounding. Alternatively, write some queries to test how it works.

## Approximate Numerics

Approximate numbers are numbers that are either very very large or very very small to be represented exactly. These numbers are mostly used in scientific calculations where absolute accuracy is not important and the numbers are rounded to a certain precision.

For example, the mass of earth is approximately `5972000000000000000000000` kilograms. This is a very large number and well beyond the range of the largest data type we have covered so far i.e. `BIGINT`. Even scientists use the scientific notation to represent this number as `5.972 x 10^24 KG` which tells us that the important part of the number is `5.972` and absolute accuracy is not important.

Instead of storing numbers like this exactly, we can store them in a way that is more space efficient and allows us to store more numbers in the database. These numbers are stored as **floating point numbers** in the database and are compatible with the scientific notation.

For example, the scientific notation for the mass of earth is:

```
Scientific Notation: 5.972  x  10^24
                    --^---     --^---
                   Mantissa   Exponent
```

We are more interested in the mantissa part of the number because it tells us the important part of the number. Floating point numbers are similar to `DECIMAL` type numbers in that they have precision but this precision only applies to the mantissa part of the number.

Here is the list of data types used to store approximate numbers:

- `FLOAT`
- `REAL`
- `DOUBLE PRECISION`

`FLOAT` and `REAL` are mostly the same and have the same precision. `DOUBLE PRECISION` have higher precision than `FLOAT` and `REAL`. You should look at the documentation of the database you are using (e.g. [PostgreSQL](https://www.postgresql.org/docs/current/datatype-numeric.html#DATATYPE-FLOAT), [MySQL](https://dev.mysql.com/doc/refman/8.3/en/floating-point-types.html)) to understand the precision of floating point numbers.

> ## Mathematical Errors
>
> It's important to note that, because floating-point values are approximate and not stored as exact values, attempts to treat them as exact in comparisons may lead to problems (e.g. `WHERE price = 1.00`). They are also subject to platform or implementation dependencies. For more information visit [Problems with Floating-Point Values](https://dev.mysql.com/doc/refman/8.4/en/problems-with-float.html).
>
> Decimal, on the other hand, stores numbers as exact values without loss of precision.

## Should I use Decimal or Floating Point?


| Decimal Numbers                                                                          | Floating-Point Numbers                                                                          |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Use when you need exact precision, such as for financial calculations or monetary values | Use when you're working with approximate values, like scientific measurements                   |
| Use when dealing with fixed-point numbers where accuracy is crucial                      | Use when you need to store very large or very small numbers efficiently                         |
|                                                                                          | Use when absolute precision is not critical, and you're willing to accept small rounding errors |
