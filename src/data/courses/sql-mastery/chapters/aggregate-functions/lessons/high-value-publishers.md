---
title: High Value Publishers
description: Practice using HAVING to filter aggregated data
order: 98
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
      price DECIMAL(10,2),
      stock_level INT
  );

  INSERT INTO publisher (id, name, country) VALUES
      (1, 'Tech Books Inc', 'USA'),
      (2, 'Global Publishing', 'UK'),
      (3, 'Education Press', 'Canada'),
      (4, 'Digital Media Ltd', 'Australia'),
      (5, 'Research Books', 'Germany');

  INSERT INTO book (id, title, publisher_id, price, stock_level) VALUES
      (1, 'Database Design', 1, 29.99, 25),
      (2, 'Advanced SQL', 1, 39.99, 15),
      (3, 'Web Development', 1, 34.99, 20),
      (4, 'Python Basics', 2, 24.99, 30),
      (5, 'Cloud Computing', 2, 49.99, 5),
      (6, 'Data Science', 3, 54.99, 20),
      (7, 'Machine Learning', 3, 59.99, 12),
      (8, 'Cybersecurity', 4, 45.99, 8),
      (9, 'Network Basics', 5, 19.99, 10);
  ```
---

The bookstore wants to identify their high-value publishers based on specific criteria. They want to find publishers who:
- Have published more than 1 book
- Have an average book price above $35
- Have more than 30 total books in stock

Given the following data in table `publisher`:

| id  | name              | country   |
| --- | ----------------- | --------- |
| 1   | Tech Books Inc    | USA       |
| 2   | Global Publishing | UK        |
| 3   | Education Press   | Canada    |
| 4   | Digital Media Ltd | Australia |
| 5   | Research Books    | Germany   |

And the following data in table `book`:

| id  | title            | publisher_id | price | stock_level |
| --- | ---------------- | ------------ | ----- | ----------- |
| 1   | Database Design  | 1            | 29.99 | 25          |
| 2   | Advanced SQL     | 1            | 39.99 | 15          |
| 3   | Web Development  | 1            | 34.99 | 20          |
| 4   | Python Basics    | 2            | 24.99 | 30          |
| 5   | Cloud Computing  | 2            | 49.99 | 5           |
| 6   | Data Science     | 3            | 54.99 | 20          |
| 7   | Machine Learning | 3            | 59.99 | 12          |
| 8   | Cybersecurity    | 4            | 45.99 | 8           |
| 9   | Network Basics   | 5            | 19.99 | 10          |

Write a query that shows:
- Publisher name
- Number of books
- Average book price
- Total books in stock

Only include publishers meeting ALL the criteria above, and order by average price descending.

## Expected Output

| publisher_name   | book_count | avg_price | total_stock |
| --------------- | ---------- | --------- | ----------- |
| Education Press | 2          | 57.49     | 32          |
| Tech Books Inc  | 3          | 34.99     | 60          |

## Solution

```sql
SELECT 
    p.name as publisher_name,
    COUNT(*) as book_count,
    AVG(b.price) as avg_price,
    SUM(b.stock_level) as total_stock
FROM publisher p
INNER JOIN book b ON p.id = b.publisher_id
GROUP BY p.id, p.name
HAVING 
    COUNT(*) > 1 
    AND AVG(b.price) > 35 
    AND SUM(b.stock_level) > 30
ORDER BY avg_price DESC;
```

### Explanation

Let's break down how this query works:

First, we join the tables:
```sql
FROM publisher p
INNER JOIN book b ON p.id = b.publisher_id
```

We calculate the required metrics:
```sql
COUNT(*) -- Number of books
AVG(b.price) -- Average price
SUM(b.stock_level) -- Total stock
```

The key part is using HAVING to filter the groups:
```sql
HAVING 
    COUNT(*) > 1 -- More than 1 book
    AND AVG(b.price) > 35 -- Average price above $35
    AND SUM(b.stock_level) > 30 -- More than 30 total books in stock
```

This query helps the bookstore identify:
- Publishers with multiple books
- Publishers with premium pricing
- Publishers with significant inventory 