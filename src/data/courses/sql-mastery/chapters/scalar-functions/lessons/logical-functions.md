---
title: Logical Functions
description: Learn how to use SQL logical functions for conditional operations
order: 150
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE customer (
      id INT PRIMARY KEY,
      name VARCHAR(255),
      phone VARCHAR(20),
      email VARCHAR(255)
  );

  INSERT INTO customer (id, name, phone, email) VALUES
  (1, 'John Doe', '123-456-7890', 'john.doe@example.com'),
  (2, 'Jane Smith', '098-765-4321', 'jane.smith@example.com'),
  (3, 'Alice Johnson', NULL, 'alice.johnson@example.com'),
  (4, 'Bob Brown', NULL, NULL);

  CREATE TABLE product (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    price DECIMAL(10, 2)
  );

  INSERT INTO product (id, name, description, price) VALUES
  (1, 'Product 1', 'Description 1', 10.00),
  (2, 'Product 2', 'Description 2', 20.00),
  (3, 'Product 3', '', 30.00);

  CREATE TABLE sale (
    id INT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    status VARCHAR(1),
    days_pending INT,
    amount DECIMAL(10, 2),
    customer_type VARCHAR(10)
  );

  INSERT INTO sale (id, customer_id, product_id, status, days_pending, amount, customer_type) VALUES
  (1, 1, 1, 'P', 3, 1200.00, 'VIP'),
  (2, 2, 2, 'C', 1, 800.00, 'Regular'),
  (3, 3, 3, 'X', 0, 1500.00, 'Regular'),
  (4, 4, 1, 'P', 7, 2000.00, 'VIP');

  CREATE TABLE product (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    price DECIMAL(10, 2),
    in_stock BOOLEAN
  );

  INSERT INTO product (id, name, description, price, in_stock) VALUES
  (1, 'Product 1', 'Description 1', 10.00, true),
  (2, 'Product 2', 'Description 2', 20.00, false),
  (3, 'Product 3', '', 300.00, true);
  ```
---

Logical functions help you handle conditional logic and `NULL` values in SQL. These functions are essential for data transformation, handling missing values, and implementing business rules in your queries.

## COALESCE Function

The `COALESCE` function returns the first non-NULL value in a list of expressions. This is particularly useful for handling `NULL` values and providing default values:

```sql
-- Basic COALESCE examples
SELECT COALESCE(NULL, 1, 2);          -- Returns: 1
SELECT COALESCE(NULL, NULL, 3);       -- Returns: 3
SELECT COALESCE(NULL, NULL, NULL);    -- Returns: NULL

-- e.g. when fetching customer data
SELECT
    name,
    COALESCE(phone, email, 'No Contact') as contact_info
FROM customer;
```

## NULLIF Function

The `NULLIF` function compares two expressions and returns `NULL` if they're equal, otherwise returns the first expression. This is useful for handling special values or converting empty strings to `NULL`:

```sql
-- Basic NULLIF examples
SELECT NULLIF(10, 10);     -- Returns: NULL
SELECT NULLIF(10, 20);     -- Returns: 10

-- e.g. to be consistent with empty strings
SELECT
    id,
    NULLIF(TRIM(description), '') as clean_description
FROM product;

-- e.g. default values for missing data
SELECT
    name,
    COALESCE(description, 'No description available') as description,
    COALESCE(price, 0.00) as price,
    COALESCE(in_stock, false) as is_available
FROM product;
```

## CASE Expression

The `CASE` expression provides if-then-else logic in SQL. There are two forms: simple CASE and searched CASE.

### Simple CASE

Used when comparing a value against multiple possible matches:

```sql
-- Map status codes to descriptions
SELECT
    id,
    CASE status
        WHEN 'P' THEN 'Pending'
        WHEN 'C' THEN 'Completed'
        WHEN 'X' THEN 'Cancelled'
        ELSE 'Unknown'
    END as status_description
FROM sale;
```

Here is another example using aggregate functions:

```sql
SELECT
    count(CASE WHEN status = 'P' THEN 1 END) as pending_orders,
    count(CASE WHEN status = 'C' THEN 1 END) as completed_orders,
    count(CASE WHEN status = 'X' THEN 1 END) as cancelled_orders
FROM sale;
```

### Searched CASE

Used for more complex conditions:

```sql
-- Assign shipping priority
SELECT
    id,
    CASE
        WHEN customer_type = 'VIP' AND amount > 1000 THEN 'Express'
        WHEN customer_type = 'VIP' OR amount > 1500 THEN 'Priority'
        ELSE 'Standard'
    END as shipping_method
FROM sale;
```

Another example to categorize products by price:

```sql
SELECT
    name,
    price,
    CASE
        WHEN price >= 100 THEN 'Premium'
        WHEN price >= 50 THEN 'Standard'
        ELSE 'Budget'
    END as price_category
FROM product;
```

Example to calculate discounts based on multiple conditions:

```sql
SELECT
    id,
    amount,
    customer_type,
    CASE
        WHEN amount >= 1000 AND customer_type = 'VIP' THEN amount * 0.8
        WHEN amount >= 1000 THEN amount * 0.9
        WHEN customer_type = 'VIP' THEN amount * 0.95
        ELSE amount
    END as discounted_amount
FROM sale;
```

Let's look at some exercises to practice these functions and move on to the next chapter about subqueries.
