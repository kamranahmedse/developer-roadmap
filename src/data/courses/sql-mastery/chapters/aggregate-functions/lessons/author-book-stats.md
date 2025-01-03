---
title: Author Book Stats
description: Practice basic aggregation with author and book data
order: 93
type: challenge
setup: |
  ```sql
  CREATE TABLE author (
      id INT PRIMARY KEY,
      name VARCHAR(255),
      country VARCHAR(100)
  );

  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(255),
      author_id INT,
      price DECIMAL(10,2),
      pages INT
  );

  INSERT INTO author (id, name, country) VALUES
      (1, 'Jane Smith', 'USA'),
      (2, 'John Brown', 'UK'),
      (3, 'Maria Garcia', 'Spain'),
      (4, 'David Wilson', 'USA');

  INSERT INTO book (id, title, author_id, price, pages) VALUES
      (1, 'Database Design', 1, 29.99, 300),
      (2, 'SQL Basics', 1, 24.99, 250),
      (3, 'Python Programming', 2, 34.99, 400),
      (4, 'Web Development', 2, 39.99, 350),
      (5, 'Data Science', 2, 44.99, 450),
      (6, 'Machine Learning', 3, 49.99, 500),
      (7, 'AI Fundamentals', 3, 54.99, 550);
  ```
---

The bookstore wants to understand how many books each author has written and their average book price. They need a summary of author statistics to help with inventory planning.

Given the following data in table `author`:

| id  | name         | country |
| --- | ------------ | ------- |
| 1   | Jane Smith   | USA     |
| 2   | John Brown   | UK      |
| 3   | Maria Garcia | Spain   |
| 4   | David Wilson | USA     |

And the following data in table `book`:

| id  | title             | author_id | price | pages |
| --- | ----------------- | --------- | ----- | ----- |
| 1   | Database Design   | 1         | 29.99 | 300   |
| 2   | SQL Basics        | 1         | 24.99 | 250   |
| 3   | Python Programming| 2         | 34.99 | 400   |
| 4   | Web Development   | 2         | 39.99 | 350   |
| 5   | Data Science      | 2         | 44.99 | 450   |
| 6   | Machine Learning  | 3         | 49.99 | 500   |
| 7   | AI Fundamentals   | 3         | 54.99 | 550   |

Write a query that shows for each author:
- Author name
- Number of books written
- Average book price
- Total pages written

Only include authors who have written books, and order the results by number of books in descending order.

## Expected Output

| author_name   | book_count | avg_price | total_pages |
| ------------- | ---------- | --------- | ----------- |
| John Brown    | 3          | 39.99     | 1200        |
| Maria Garcia  | 2          | 52.49     | 1050        |
| Jane Smith    | 2          | 27.49     | 550         |

## Solution

```sql
SELECT 
    a.name as author_name,
    COUNT(*) as book_count,
    AVG(b.price) as avg_price,
    SUM(b.pages) as total_pages
FROM author a
INNER JOIN book b ON a.id = b.author_id
GROUP BY a.name
ORDER BY book_count DESC;
```

### Explanation

Let's break down how this query works:

First, we join the author and book tables:
```sql
FROM author a
INNER JOIN book b ON a.id = b.author_id
```

We then calculate various aggregates for each author:
```sql
COUNT(*) -- Counts the number of books
AVG(b.price) -- Calculates average book price
SUM(b.pages) -- Sums up total pages
```

We group the results by author name:
```sql
GROUP BY a.name
```

Finally, we order by the book count:
```sql
ORDER BY book_count DESC
```

This query helps the bookstore understand:
- John Brown has written the most books (3)
- Maria Garcia's books have the highest average price ($52.49)
- John Brown has written the most pages (1,200) 