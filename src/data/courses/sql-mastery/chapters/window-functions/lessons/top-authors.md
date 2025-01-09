---
title: Top Authors
description: Practice using RANK to find the most successful authors
order: 150
type: challenge
setup: |
  ```sql
  CREATE TABLE author (
      id INT PRIMARY KEY,
      name VARCHAR(100),
      country VARCHAR(50)
  );

  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(100),
      author_id INT,
      copies_sold INT
  );

  INSERT INTO author (id, name, country) VALUES
      (1, 'John Smith', 'USA'),
      (2, 'Emma Wilson', 'UK'),
      (3, 'Michael Brown', 'Canada'),
      (4, 'Sarah Davis', 'USA'),
      (5, 'David Miller', 'UK'),
      (6, 'Lisa Chen', 'Canada');

  INSERT INTO book (id, title, author_id, copies_sold) VALUES
      (1, 'SQL Basics', 1, 1500),
      (2, 'Advanced SQL', 1, 2500),
      (3, 'Data Science', 2, 3000),
      (4, 'Web Development', 3, 1800),
      (5, 'Python Basics', 4, 2800),
      (6, 'Machine Learning', 2, 4000),
      (7, 'Database Design', 5, 1200),
      (8, 'Cloud Computing', 6, 900),
      (9, 'JavaScript Guide', 4, 2200);
  ```
---

The bookstore wants to identify their top-selling authors. They need a report showing the top 3 authors based on total books sold.

Given the following data:

**author table:**
| id  | name          | country |
| --- | ------------- | ------- |
| 1   | John Smith    | USA     |
| 2   | Emma Wilson   | UK      |
| 3   | Michael Brown | Canada  |
| 4   | Sarah Davis   | USA     |
| 5   | David Miller  | UK      |
| 6   | Lisa Chen     | Canada  |

**book table:**
| id | title            | author_id | copies_sold |
| -- | ---------------- | --------- | ----------- |
| 1  | SQL Basics       | 1         | 1500        |
| 2  | Advanced SQL     | 1         | 2500        |
| 3  | Data Science     | 2         | 3000        |
| 4  | Web Development  | 3         | 1800        |
| 5  | Python Basics    | 4         | 2800        |
| 6  | Machine Learning | 2         | 4000        |
| 7  | Database Design  | 5         | 1200        |
| 8  | Cloud Computing  | 6         | 900         |
| 9  | JavaScript Guide | 4         | 2200        |

Write a query that shows:
- Author name
- Author's country
- Total copies sold
- Author's rank (based on total copies sold)

Only include the top 3 authors, ordered by their rank (ascending).

## Expected Output

| author_name  | country | total_copies | author_rank |
| ------------ | ------- | ------------ | ----------- |
| Emma Wilson  | UK      | 7000         | 1           |
| Sarah Davis  | USA     | 5000         | 2           |
| John Smith   | USA     | 4000         | 3           |

## Solution

```sql
SELECT 
    a.name as author_name,
    a.country,
    SUM(b.copies_sold) as total_copies,
    RANK() OVER (ORDER BY SUM(b.copies_sold) DESC) as author_rank
FROM author a
INNER JOIN book b ON b.author_id = a.id
GROUP BY a.id, a.name, a.country
ORDER BY author_rank
LIMIT 3;
```