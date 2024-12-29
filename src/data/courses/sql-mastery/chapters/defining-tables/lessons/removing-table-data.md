---
title: Removing Table Data
description: Practice removing table data using DELETE and TRUNCATE statements
order: 360
type: challenge
setup: |
  ```sql
  CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2),
    stock_quantity INTEGER,
    last_updated TIMESTAMP
  );

  INSERT INTO products (product_name, price, stock_quantity, last_updated) VALUES
    ('Product A', 10.00, 100, '2024-01-01'),
    ('Product B', 20.00, 200, '2024-01-02'),
    ('Product C', 30.00, 300, '2024-01-03');
  ```
---

I have created a table called `products` with the following columns:

| Column         | Type          | Constraints                 |
| -------------- | ------------- | --------------------------- |
| id             | SERIAL        | PRIMARY KEY                 |
| product_name   | VARCHAR(100)  |                             |
| price          | DECIMAL(10,2) | CHECK (price > 0)           |
| stock_quantity | INTEGER       | CHECK (stock_quantity >= 0) |
| last_updated   | TIMESTAMP     |                             |

Note that the `id` column is set to `SERIAL`, which means it will automatically generate a unique value for each new row.

I have also inserted some dummy data into the table:

| id  | product_name | price | stock_quantity | last_updated |
| --- | ------------ | ----- | -------------- | ------------ |
| 1   | Product A    | 10.00 | 100            | 2024-01-01   |
| 2   | Product B    | 20.00 | 200            | 2024-01-02   |
| 3   | Product C    | 30.00 | 300            | 2024-01-03   |

You are required to remove all the data from the `products` table.

## Solution

```sql
TRUNCATE TABLE products;
```
