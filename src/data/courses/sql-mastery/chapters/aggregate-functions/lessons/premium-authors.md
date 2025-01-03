---
title: Premium Authors
description: Practice using HAVING to find high-value authors
order: 99
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
      rating DECIMAL(2,1)
  );

  INSERT INTO author (id, name, country) VALUES
      (1, 'John Smith', 'USA'),
      (2, 'Emma Wilson', 'UK'),
      (3, 'David Chen', 'China'),
      (4, 'Maria Garcia', 'Spain'),
      (5, 'James Brown', 'USA');

  INSERT INTO book (id, title, author_id, price, rating) VALUES
      (1, 'SQL Mastery', 1, 45.99, 4.5),
      (2, 'Database Design', 1, 49.99, 4.8),
      (3, 'Python Basics', 2, 29.99, 4.2),
      (4, 'Web Development', 2, 34.99, 4.0),
      (5, 'Data Science', 2, 39.99, 4.6),
      (6, 'Machine Learning', 3, 54.99, 4.7),
      (7, 'AI Fundamentals', 3, 59.99, 4.9),
      (8, 'Cloud Computing', 4, 44.99, 4.3),
      (9, 'Basic Programming', 5, 24.99, 3.8);
  ```
---

The bookstore wants to identify their premium authors - those who consistently produce high-value, well-rated books. They want to find authors who:
- Have written at least 2 books
- Have an average book price above $40
- Have an average rating above 4.5

Given the following data in table `author`:

| id  | name         | country |
| --- | ------------ | ------- |
| 1   | John Smith   | USA     |
| 2   | Emma Wilson  | UK      |
| 3   | David Chen   | China   |
| 4   | Maria Garcia | Spain   |
| 5   | James Brown  | USA     |

And the following data in table `book`:

| id  | title             | author_id | price | rating |
| --- | ----------------- | --------- | ----- | ------ |
| 1   | SQL Mastery       | 1         | 45.99 | 4.5    |
| 2   | Database Design   | 1         | 49.99 | 4.8    |
| 3   | Python Basics     | 2         | 29.99 | 4.2    |
| 4   | Web Development   | 2         | 34.99 | 4.0    |
| 5   | Data Science      | 2         | 39.99 | 4.6    |
| 6   | Machine Learning  | 3         | 54.99 | 4.7    |
| 7   | AI Fundamentals   | 3         | 59.99 | 4.9    |
| 8   | Cloud Computing   | 4         | 44.99 | 4.3    |
| 9   | Basic Programming | 5         | 24.99 | 3.8    |

Write a query that shows:
- Author name
- Number of books written
- Average book price
- Average book rating

Only include authors meeting ALL the criteria above, and order by average rating descending.

## Expected Output

| author_name | book_count | avg_price | avg_rating |
| ----------- | ---------- | --------- | ---------- |
| David Chen  | 2          | 57.49     | 4.80       |
| John Smith  | 2          | 47.99     | 4.65       |

## Solution

```sql
SELECT 
    a.name as author_name,
    COUNT(*) as book_count,
    AVG(b.price) as avg_price,
    AVG(b.rating) as avg_rating
FROM author a
INNER JOIN book b ON a.id = b.author_id
GROUP BY a.id, a.name
HAVING 
    COUNT(*) >= 2 
    AND AVG(b.price) > 40 
    AND AVG(b.rating) > 4.5
ORDER BY avg_rating DESC;
```

### Explanation

Let's break down how this query works:

We join the author and book tables:
```sql
FROM author a
INNER JOIN book b ON a.id = b.author_id
```

We calculate the metrics for each author:
```sql
COUNT(*) -- Number of books written
AVG(b.price) -- Average book price
AVG(b.rating) -- Average book rating
```

The key part is using HAVING to filter for premium authors:
```sql
HAVING 
    COUNT(*) >= 2 -- At least 2 books
    AND AVG(b.price) > 40 -- Average price above $40
    AND AVG(b.rating) > 4.5 -- Average rating above 4.5
```