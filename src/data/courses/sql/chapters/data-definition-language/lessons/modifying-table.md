---
title: Modifying Tables
description: Practice modifying table structure using ALTER TABLE statements
order: 350
type: challenge
setup: |
  ```sql
  CREATE TABLE products (
      id INTEGER,
      product_name VARCHAR(100),
      description TEXT,
      price DECIMAL(10,2),
      stock_quantity INTEGER,
      last_updated TIMESTAMP,

      CONSTRAINT pk_products PRIMARY KEY (id),
      CONSTRAINT chk_price CHECK (price > 0),
      CONSTRAINT chk_stock CHECK (stock_quantity >= 0)
  );
  ```
---

Given the following `products` table structure:

| Column         | Type          | Constraints                 |
| -------------- | ------------- | --------------------------- |
| id             | INTEGER       | PRIMARY KEY                 |
| product_name   | VARCHAR(100)  |                             |
| description    | TEXT          |                             |
| price          | DECIMAL(10,2) | CHECK (price > 0)           |
| stock_quantity | INTEGER       | CHECK (stock_quantity >= 0) |
| last_updated   | TIMESTAMP     |                             |

Write SQL statements to make the following modifications to the table structure:

1. Remove the `description` column as it's no longer needed
2. Add a new `category` column of type `VARCHAR(50)` that cannot be NULL
3. Change the data type of `price` to `DECIMAL(12,2)` to allow for higher prices
4. Remove the constraint named `chk_stock`
5. Add a new `UNIQUE` constraint on the `product_name` column named `unq_product_name`

## Expected Output

After executing your query, the table should be modified successfully with all specified changes. You can verify the result of your changes under the `Schema` tab.

> Note, click the `Reset` button to reset to initial state if you want to try again.

## Solution

```sql
-- Remove the description column
ALTER TABLE products DROP COLUMN description;

-- Add the category column
ALTER TABLE products ADD COLUMN category VARCHAR(50) NOT NULL DEFAULT 'Uncategorized';

-- Modify the price column type
ALTER TABLE products ALTER COLUMN price TYPE DECIMAL(12,2);

-- Remove the stock quantity check constraint
ALTER TABLE products DROP CONSTRAINT chk_stock;

-- Add unique constraint on product_name
ALTER TABLE products ADD CONSTRAINT unq_product_name UNIQUE (product_name);
```
