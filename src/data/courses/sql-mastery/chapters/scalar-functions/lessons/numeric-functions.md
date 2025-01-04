---
title: Numeric Functions
description: Learn how to perform mathematical operations using SQL numeric functions
order: 120
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE sale (
    sale_id INT,
    amount INT
  );

  INSERT INTO sale (sale_id, amount) 
  VALUES (1, 110), 
    (2, 320), 
    (3, 630), 
    (4, 140), 
    (5, -150), 
    (6, 550);

  CREATE TABLE product (
    product_id INT,
    price INT
  );

  INSERT INTO product (product_id, price) VALUES (1, 100), (2, 200), (3, 300), (4, 400), (5, 500);
  ```
---

Numeric functions help you perform mathematical calculations and manipulate numeric values. These functions are essential for financial calculations, statistical analysis, and general numeric data processing.

Let's look at some of the common numeric functions in this lesson.

## Rounding Functions

When working with decimal numbers, you often need to round them to a specific number of decimal places. SQL provides several functions for this:

```sql
-- Round to nearest integer
SELECT ROUND(3.7);    -- Returns: 4
SELECT ROUND(3.3);    -- Returns: 3

-- Round to specific decimal places
SELECT ROUND(3.14159, 2);  -- Returns: 3.14

-- Round up (ceiling)
SELECT CEILING(3.1);     -- Returns: 4

-- Round down (floor)
SELECT FLOOR(3.9);    -- Returns: 3
```

## Absolute Value and Sign

These functions are useful when you need to work with numbers regardless of their sign, or when you need to determine if a number is positive, negative, or zero:

```sql
-- Get absolute value
SELECT ABS(-15.7);    -- Returns: 15.7

-- Get sign of number (-1, 0, or 1)
SELECT SIGN(-15.7);   -- Returns: -1
SELECT SIGN(0);       -- Returns: 0
SELECT SIGN(15.7);    -- Returns: 1
```

## Power and Square Root

For more complex calculations, SQL provides functions for exponents and roots:

```sql
-- Power function - 2^3
SELECT POWER(2, 3);   -- Returns: 8

-- Square root
SELECT SQRT(16);      -- Returns: 4
```

## Practical Examples

Let's look at some examples using sample tables:

### Order Table

| sale_id | amount |
| ------- | ------ |
| 1       | 110    |
| 2       | 320    |
| 3       | 630    |
| 4       | 140    |
| 5       | -150   |
| 6       | 550    |

### Calculating Sales Tax

Let's say that we want to add a 10% tax to each order and round the result to 2 decimal places:

```sql
SELECT
    sale_id,
    amount,
    ROUND(amount * 10 / 100, 2) as tax,
    ROUND(amount + (amount * 10 / 100), 2) as amount_with_tax
FROM sale
WHERE amount > 0; -- ignore refunds
```

### Handling Negative Values

Sometimes you might need to handle negative values (like refunds) in your financial calculations:

```sql
SELECT
    sale_id,
    amount,
    ABS(amount) as absolute_amount,
    CASE
        WHEN SIGN(amount) = 1 THEN 'Payment'
        WHEN SIGN(amount) = -1 THEN 'Refund'
        ELSE 'Zero Transaction'
    END as transaction_description
FROM sale;
```

### Applying Dynamic Discounts

Let's say that we want to apply a 10% discount to products priced at $100 or more, and keep the original price for cheaper products:

```sql
SELECT
    product_name,
    price,
    CASE
        WHEN price >= 100 THEN ROUND(price * 0.9, 2)  -- 10% off
        ELSE price
    END as discounted_price
FROM product;
```

In the next lesson, we'll explore date functions for working with temporal data.
