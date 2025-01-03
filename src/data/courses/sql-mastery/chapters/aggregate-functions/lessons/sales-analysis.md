---
title: Sales Analysis
description: Practice using aggregate functions to analyze sales data
order: 100
type: challenge
setup: |
  ```sql
  CREATE TABLE sale (
      id INT PRIMARY KEY,
      sale_date DATE,
      customer_id INT,
      book_id INT,
      quantity INT,
      unit_price DECIMAL(10,2)
  );

  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(255),
      category VARCHAR(100)
  );

  INSERT INTO book (id, title, category)
  VALUES 
      (1, 'The Great Gatsby', 'Fiction'),
      (2, 'Data Science Basics', 'Technical'),
      (3, 'History of Time', 'Non-Fiction'),
      (4, 'Programming 101', 'Technical'),
      (5, 'Pride and Prejudice', 'Fiction');

  INSERT INTO sale (id, sale_date, customer_id, book_id, quantity, unit_price)
  VALUES 
      (1, '2024-01-15', 1, 1, 2, 15.99),
      (2, '2024-01-15', 2, 2, 1, 29.99),
      (3, '2024-01-15', 3, 3, 3, 19.99),
      (4, '2024-01-16', 4, 4, 1, 24.99),
      (5, '2024-01-16', 5, 5, 2, 12.99),
      (6, '2024-01-16', 1, 2, 1, 29.99),
      (7, '2024-01-17', 2, 3, 2, 19.99),
      (8, '2024-01-17', 3, 4, 1, 24.99),
      (9, '2024-01-17', 4, 5, 3, 12.99),
      (10, '2024-01-18', 5, 1, 1, 15.99);
  ```
---

The bookstore manager wants to analyze their sales data to understand sales patterns and make inventory decisions. They need a comprehensive report that shows sales metrics by book category.

Given the following data in table `book`:

| id  | title               | category    |
| --- | ------------------- | ----------- |
| 1   | The Great Gatsby    | Fiction     |
| 2   | Data Science Basics | Technical   |
| 3   | History of Time     | Non-Fiction |
| 4   | Programming 101     | Technical   |
| 5   | Pride and Prejudice | Fiction     |

And the following data in table `sale`:

| id  | sale_date  | customer_id | book_id | quantity | unit_price |
| --- | ---------- | ----------- | ------- | -------- | ---------- |
| 1   | 2024-01-15 | 1           | 1       | 2        | 15.99      |
| 2   | 2024-01-15 | 2           | 2       | 1        | 29.99      |
| 3   | 2024-01-15 | 3           | 3       | 3        | 19.99      |
| 4   | 2024-01-16 | 4           | 4       | 1        | 24.99      |
| 5   | 2024-01-16 | 5           | 5       | 2        | 12.99      |
| 6   | 2024-01-16 | 1           | 2       | 1        | 29.99      |
| 7   | 2024-01-17 | 2           | 3       | 2        | 19.99      |
| 8   | 2024-01-17 | 3           | 4       | 1        | 24.99      |
| 9   | 2024-01-17 | 4           | 5       | 3        | 12.99      |
| 10  | 2024-01-18 | 5           | 1       | 1        | 15.99      |

Write a query to generate a sales report showing the following metrics for each book category:

- Total number of sales (count of transactions)
- Total quantity of books sold
- Total revenue (quantity * unit_price)
- Average price per book
- Maximum quantity in a single transaction

Only include categories that have generated more than $50 in total revenue, and order the results by total revenue in descending order.

## Expected Output

| category    | total_sales | total_quantity | total_revenue | avg_price | max_quantity |
| ----------- | ----------- | -------------- | ------------- | --------- | ------------ |
| Technical   | 3           | 3              | 109.96        | 27.49     | 1            |
| Fiction     | 4           | 8              | 90.93         | 14.49     | 3            |
| Non-Fiction | 2           | 5              | 99.95         | 19.99     | 3            |

## Solution

```sql
SELECT 
    b.category,
    COUNT(*) as total_sales,
    SUM(s.quantity) as total_quantity,
    SUM(s.quantity * s.unit_price) as total_revenue,
    AVG(s.unit_price) as avg_price,
    MAX(s.quantity) as max_quantity
FROM sale s
INNER JOIN book b ON s.book_id = b.id
GROUP BY b.category
HAVING SUM(s.quantity * s.unit_price) > 50
ORDER BY total_revenue DESC;
```

### Explanation

Let's break down how this query works:

First, we join the `sale` and `book` tables to get category information for each sale:

```sql
FROM sale s
INNER JOIN book b ON s.book_id = b.id
```

We then group the results by category to calculate aggregates for each category:

```sql
GROUP BY b.category
```

We use multiple aggregate functions to calculate different metrics:

```sql
COUNT(*) -- Counts number of sales transactions
SUM(s.quantity) -- Sums up total books sold
SUM(s.quantity * s.unit_price) -- Calculates total revenue
AVG(s.unit_price) -- Calculates average price
MAX(s.quantity) -- Finds maximum quantity in a single sale
```

We filter out categories with low revenue using HAVING:

```sql
HAVING SUM(s.quantity * s.unit_price) > 50
```

Finally, we order the results by total revenue in descending order:

```sql
ORDER BY total_revenue DESC
```
