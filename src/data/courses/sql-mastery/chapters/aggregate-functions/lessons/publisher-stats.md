---
title: Publisher Stats
description: Practice basic aggregation with publisher data
order: 96
type: challenge
setup: |
  ```sql
  CREATE TABLE publisher (
      id INT PRIMARY KEY,
      name VARCHAR(255),
      country VARCHAR(100)
  );

  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(255),
      publisher_id INT,
      pages INT,
      stock_level INT,
      price DECIMAL(10,2)
  );

  INSERT INTO publisher (id, name, country) VALUES
      (1, 'Tech Books Inc', 'USA'),
      (2, 'Global Publishing', 'UK'),
      (3, 'Education Press', 'Canada'),
      (4, 'Digital Media Ltd', 'Australia');

  INSERT INTO book (id, title, publisher_id, pages, stock_level, price) VALUES
      (1, 'Database Fundamentals', 1, 300, 25, 29.99),
      (2, 'Advanced SQL', 1, 400, 15, 39.99),
      (3, 'Web Development', 1, 350, 0, 34.99),
      (4, 'Python Mastery', 2, 450, 30, 44.99),
      (5, 'Cloud Computing', 2, 375, 5, 49.99),
      (6, 'Data Science', 3, 425, 20, 54.99),
      (7, 'Machine Learning', 3, 500, 12, 59.99),
      (8, 'Cybersecurity', 4, 350, 8, 45.99);
  ```
---

The bookstore wants to analyze their publishers' performance in terms of book variety, pricing, and stock levels.

Given the following data in table `publisher`:

| id  | name              | country   |
| --- | ----------------- | --------- |
| 1   | Tech Books Inc    | USA       |
| 2   | Global Publishing | UK        |
| 3   | Education Press   | Canada    |
| 4   | Digital Media Ltd | Australia |

And the following data in table `book`:

| id  | title                | publisher_id | pages | stock_level | price |
| --- | -------------------- | ------------ | ----- | ----------- | ----- |
| 1   | Database Fundamentals| 1            | 300   | 25          | 29.99 |
| 2   | Advanced SQL         | 1            | 400   | 15          | 39.99 |
| 3   | Web Development      | 1            | 350   | 0           | 34.99 |
| 4   | Python Mastery       | 2            | 450   | 30          | 44.99 |
| 5   | Cloud Computing      | 2            | 375   | 5           | 49.99 |
| 6   | Data Science         | 3            | 425   | 20          | 54.99 |
| 7   | Machine Learning     | 3            | 500   | 12          | 59.99 |
| 8   | Cybersecurity        | 4            | 350   | 8           | 45.99 |

Write a query that shows for each publisher:
- Publisher name
- Number of books published
- Total books in stock
- Average book price
- Number of out-of-stock books (`stock_level = 0`)

Only include publishers who have published at least one book, and order the results by number of books in descending order.

## Expected Output

| publisher_name    | book_count | total_stock | avg_price | out_of_stock |
| ---------------- | ---------- | ----------- | --------- | ------------ |
| Tech Books Inc   | 3          | 40          | 34.99     | 1            |
| Global Publishing| 2          | 35          | 47.49     | 0            |
| Education Press  | 2          | 32          | 57.49     | 0            |
| Digital Media Ltd| 1          | 8           | 45.99     | 0            |

## Solution

```sql
SELECT 
    p.name as publisher_name,
    COUNT(*) as book_count,
    SUM(b.stock_level) as total_stock,
    AVG(b.price) as avg_price,
    COUNT(CASE WHEN b.stock_level = 0 THEN 1 END) as out_of_stock
FROM publisher p
INNER JOIN book b ON p.id = b.publisher_id
GROUP BY p.id, p.name
ORDER BY book_count DESC;
```

### Explanation

Let's break down how this query works:

We join the publisher and book tables:
```sql
FROM publisher p
INNER JOIN book b ON p.id = b.publisher_id
```

We calculate various metrics for each publisher:
```sql
COUNT(*) -- Counts number of books
SUM(b.stock_level) -- Adds up all books in stock
AVG(b.price) -- Calculates average price
COUNT(CASE WHEN b.stock_level = 0 THEN 1 END) -- Counts out-of-stock books
```

We group by publisher:
```sql
GROUP BY p.id, p.name
```

Finally, we order by the number of books:
```sql
ORDER BY book_count DESC
```