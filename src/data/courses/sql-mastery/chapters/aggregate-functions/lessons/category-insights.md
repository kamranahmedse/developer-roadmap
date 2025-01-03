---
title: Category Insights
description: Practice basic aggregation with book categories
order: 91
type: challenge
setup: |
  ```sql
  CREATE TABLE category (
      id INT PRIMARY KEY,
      name VARCHAR(100),
      display_section VARCHAR(50)
  );

  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(255),
      category_id INT,
      price DECIMAL(10,2),
      in_stock INT
  );

  INSERT INTO category (id, name, display_section) VALUES
      (1, 'Fiction', 'Main Floor'),
      (2, 'Science Fiction', 'Main Floor'),
      (3, 'Technical', 'Second Floor'),
      (4, 'History', 'Main Floor');

  INSERT INTO book (id, title, category_id, price, in_stock) VALUES
      (1, 'The Last Hope', 1, 19.99, 5),
      (2, 'Stars Beyond', 2, 15.99, 3),
      (3, 'Python Basics', 3, 29.99, 10),
      (4, 'Ancient Rome', 4, 24.99, 4),
      (5, 'Summer Days', 1, 14.99, 2),
      (6, 'Space Wars', 2, 16.99, 3),
      (7, 'JavaScript 101', 3, 27.99, 8);
  ```
---

The bookstore manager wants a simple overview of their book categories to help with inventory management.

Given the following data in table `category`:

| id  | name            | display_section |
| --- | --------------- | -------------- |
| 1   | Fiction         | Main Floor     |
| 2   | Science Fiction | Main Floor     |
| 3   | Technical       | Second Floor   |
| 4   | History         | Main Floor     |

And the following data in table `book`:

| id  | title          | category_id | price | in_stock |
| --- | -------------- | ----------- | ----- | -------- |
| 1   | The Last Hope  | 1           | 19.99 | 5        |
| 2   | Stars Beyond   | 2           | 15.99 | 3        |
| 3   | Python Basics  | 3           | 29.99 | 10       |
| 4   | Ancient Rome   | 4           | 24.99 | 4        |
| 5   | Summer Days    | 1           | 14.99 | 2        |
| 6   | Space Wars     | 2           | 16.99 | 3        |
| 7   | JavaScript 101 | 3           | 27.99 | 8        |

Write a query that shows for each category:
- Category name
- Number of books
- Total books in stock
- Average book price

Order the results by the number of books in descending order.

## Expected Output

| category_name   | book_count | total_stock | avg_price |
| -------------- | ---------- | ----------- | --------- |
| Technical      | 2          | 18          | 28.99     |
| Science Fiction| 2          | 6           | 16.49     |
| Fiction        | 2          | 7           | 17.49     |
| History        | 1          | 4           | 24.99     |

## Solution

```sql
SELECT 
    c.name as category_name,
    COUNT(*) as book_count,
    SUM(b.in_stock) as total_stock,
    AVG(b.price) as avg_price
FROM category c
INNER JOIN book b ON c.id = b.category_id
GROUP BY c.name
ORDER BY book_count DESC;
```

### Explanation

Let's break down how this query works:

We join the category and book tables:
```sql
FROM category c
INNER JOIN book b ON c.id = b.category_id
```

We calculate the aggregates for each category:
```sql
COUNT(*) -- Counts number of books
SUM(b.in_stock) -- Adds up all books in stock
AVG(b.price) -- Calculates average price
```

We group by category name:
```sql
GROUP BY c.name
```

Finally, we order by the book count:
```sql
ORDER BY book_count DESC
```

This query helps the manager understand:
- Which categories have the most titles
- Total inventory by category
- Average price point for each category 