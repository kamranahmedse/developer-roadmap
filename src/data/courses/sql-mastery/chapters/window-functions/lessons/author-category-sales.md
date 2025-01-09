---
title: Author Category Sales
description: Practice using window functions with joined tables to analyze sales by category
order: 140
type: challenge
setup: |
  ```sql
  CREATE TABLE author (
      id INT PRIMARY KEY,
      name VARCHAR(100)
  );

  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(100),
      author_id INT,
      category VARCHAR(50),
      copies_sold INT
  );

  INSERT INTO author (id, name) VALUES
      (1, 'John Smith'),
      (2, 'Emma Wilson'),
      (3, 'Michael Brown'),
      (4, 'Sarah Davis');

  INSERT INTO book (id, title, author_id, category, copies_sold) VALUES
      (1, 'SQL Basics', 1, 'Programming', 1500),
      (2, 'Advanced SQL', 1, 'Programming', 2500),
      (3, 'Data Science', 2, 'Data Analysis', 2000),
      (4, 'Web Development', 3, 'Programming', 1800),
      (5, 'Statistics 101', 2, 'Data Analysis', 1200),
      (6, 'Python Basics', 4, 'Programming', 3000),
      (7, 'Machine Learning', 2, 'Data Analysis', 2200);
  ```
---

The bookstore wants to see how each book's sales compare to the average sales in its category. This will help identify which authors are performing above or below average in each category.

Given the following data:

**author table:**
| id  | name          |
| --- | ------------- |
| 1   | John Smith    |
| 2   | Emma Wilson   |
| 3   | Michael Brown |
| 4   | Sarah Davis   |

**book table:**
| id  | title            | author_id | category      | copies_sold |
| --- | ---------------- | --------- | ------------- | ----------- |
| 1   | SQL Basics       | 1         | Programming   | 1500        |
| 2   | Advanced SQL     | 1         | Programming   | 2500        |
| 3   | Data Science     | 2         | Data Analysis | 2000        |
| 4   | Web Development  | 3         | Programming   | 1800        |
| 5   | Statistics 101   | 2         | Data Analysis | 1200        |
| 6   | Python Basics    | 4         | Programming   | 3000        |
| 7   | Machine Learning | 2         | Data Analysis | 2200        |

Write a query that shows:
- Author name
- Book title
- Category
- Copies sold
- Average copies sold in that category

Order the results by category (ascending) and copies sold (descending).

## Expected Output

| author_name    | title            | category      | copies_sold | category_avg |
| ------------- | ---------------- | ------------- | ----------- | ------------ |
| Emma Wilson   | Machine Learning | Data Analysis | 2200        | 1800         |
| Emma Wilson   | Data Science     | Data Analysis | 2000        | 1800         |
| Emma Wilson   | Statistics 101   | Data Analysis | 1200        | 1800         |
| Sarah Davis   | Python Basics    | Programming   | 3000        | 2200         |
| John Smith    | Advanced SQL     | Programming   | 2500        | 2200         |
| Michael Brown | Web Development  | Programming   | 1800        | 2200         |
| John Smith    | SQL Basics       | Programming   | 1500        | 2200         |

## Solution

```sql
SELECT 
    a.name as author_name,
    b.title,
    b.category,
    b.copies_sold,
    AVG(b.copies_sold) OVER (
        PARTITION BY b.category
    ) as category_avg
FROM book b
INNER JOIN author a ON a.id = b.author_id
ORDER BY b.category, b.copies_sold DESC;
```