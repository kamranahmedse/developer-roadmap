---
title: Author Tier Analysis
description: Practice using CASE WHEN with aggregate functions
order: 92
type: challenge
setup: |
  ```sql
  CREATE TABLE author (
      id INT PRIMARY KEY,
      name VARCHAR(255)
  );

  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(255),
      author_id INT,
      price DECIMAL(10,2)
  );

  INSERT INTO author (id, name) VALUES
      (1, 'John Smith'),
      (2, 'Emma Wilson'),
      (3, 'Michael Brown'),
      (4, 'Sarah Davis'),
      (5, 'James Miller');

  INSERT INTO book (id, title, author_id, price) VALUES
      (1, 'SQL Basics', 1, 29.99),
      (2, 'Advanced SQL', 1, 39.99),
      (3, 'Database Design', 1, 44.99),
      (4, 'Web Development', 2, 34.99),
      (5, 'JavaScript Guide', 2, 29.99),
      (6, 'Python Programming', 3, 24.99),
      (7, 'Data Analysis', 4, 49.99);
  ```
---

The bookstore wants to categorize their authors based on how many books they've published. They want to label authors as:
- `Prolific Author` if they have written 3 or more books
- `Established Author` if they have written 2 books
- `New Author` if they have written 1 book

Given the following data in table `author`:

| id  | name          |
| --- | ------------- |
| 1   | John Smith    |
| 2   | Emma Wilson   |
| 3   | Michael Brown |
| 4   | Sarah Davis   |
| 5   | James Miller  |

And the following data in table `book`:

| id  | title             | author_id | price |
| --- | ----------------- | --------- | ----- |
| 1   | SQL Basics        | 1         | 29.99 |
| 2   | Advanced SQL      | 1         | 39.99 |
| 3   | Database Design   | 1         | 44.99 |
| 4   | Web Development   | 2         | 34.99 |
| 5   | JavaScript Guide  | 2         | 29.99 |
| 6   | Python Programming| 3         | 24.99 |
| 7   | Data Analysis     | 4         | 49.99 |

Write a query that shows:
- Author name
- Number of books written
- Author tier (based on the categories above)

Only include authors who have published at least one book, and order the results by number of books in descending order.

## Expected Output

| author_name   | book_count | author_tier      |
| ------------- | ---------- | ---------------- |
| John Smith    | 3          | Prolific Author  |
| Emma Wilson   | 2          | Established Author|
| Michael Brown | 1          | New Author       |
| Sarah Davis   | 1          | New Author       |

## Solution

```sql
SELECT 
    a.name as author_name,
    COUNT(*) as book_count,
    CASE 
        WHEN COUNT(*) >= 3 THEN 'Prolific Author'
        WHEN COUNT(*) = 2 THEN 'Established Author'
        ELSE 'New Author'
    END as author_tier
FROM author a
INNER JOIN book b ON a.id = b.author_id
GROUP BY a.name
ORDER BY book_count DESC;
```

### Explanation

Let's break down how this query works:

We join the author and book tables:
```sql
FROM author a
INNER JOIN book b ON a.id = b.author_id
```

We count books for each author:
```sql
COUNT(*) as book_count
```

We use CASE WHEN to categorize authors:
```sql
CASE 
    WHEN COUNT(*) >= 3 THEN 'Prolific Author'
    WHEN COUNT(*) = 2 THEN 'Established Author'
    ELSE 'New Author'
END as author_tier
```

We group by author name and order by book count:
```sql
GROUP BY a.name
ORDER BY book_count DESC
```

This query helps the bookstore:
- Identify their most productive authors
- Categorize authors based on their output
- See the exact number of books by each author 