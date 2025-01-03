---
title: Book Sales Summary
description: Practice using basic aggregate functions to analyze sales data
order: 90
type: challenge
setup: |
  ```sql
  CREATE TABLE book_sale (
      id INT PRIMARY KEY,
      title VARCHAR(255),
      quantity INT,
      price DECIMAL(10,2),
      sale_date DATE
  );

  INSERT INTO book_sale (id, title, quantity, price, sale_date)
  VALUES 
      (1, 'The Great Gatsby', 2, 19.99, '2024-01-15'),
      (2, 'Pride and Prejudice', 1, 14.99, '2024-01-15'),
      (3, '1984', 3, 12.99, '2024-01-16'),
      (4, 'The Hobbit', 2, 24.99, '2024-01-16'),
      (5, 'To Kill a Mockingbird', 1, 16.99, '2024-01-17');
  ```
---

The bookstore owner wants a quick summary of their book sales. They need to know:
- How many sales transactions they've had
- The total number of books sold
- The average price of books sold
- The total revenue from all sales

Given the following data in table `book_sale`:

| id  | title                  | quantity | price | sale_date  |
| --- | ---------------------- | -------- | ----- | ---------- |
| 1   | The Great Gatsby      | 2        | 19.99 | 2024-01-15 |
| 2   | Pride and Prejudice   | 1        | 14.99 | 2024-01-15 |
| 3   | 1984                  | 3        | 12.99 | 2024-01-16 |
| 4   | The Hobbit            | 2        | 24.99 | 2024-01-16 |
| 5   | To Kill a Mockingbird | 1        | 16.99 | 2024-01-17 |

Write a query that shows:
- Total number of sales transactions
- Total quantity of books sold
- Average price per book
- Total revenue (quantity * price)

## Expected Output

| total_transactions | total_books | avg_price | total_revenue |
| ----------------- | ----------- | --------- | ------------- |
| 5                 | 9           | 17.99     | 161.91        |

## Solution

```sql
SELECT 
    COUNT(*) as total_transactions,
    SUM(quantity) as total_books,
    AVG(price) as avg_price,
    SUM(quantity * price) as total_revenue
FROM book_sale;
```

### Explanation

Let's break down how this query works:

We use different aggregate functions to calculate each metric:

```sql
COUNT(*) -- Counts the total number of rows (sales transactions)
```

```sql
SUM(quantity) -- Adds up all quantities to get total books sold
```

```sql
AVG(price) -- Calculates the average price of books
```

```sql
SUM(quantity * price) -- Multiplies quantity by price for each sale and adds them up
```

This simple query gives the bookstore owner a quick overview of their sales performance, showing:
- They've had 5 sales transactions
- Sold a total of 9 books
- The average book price is $17.99
- Generated total revenue of $161.91 