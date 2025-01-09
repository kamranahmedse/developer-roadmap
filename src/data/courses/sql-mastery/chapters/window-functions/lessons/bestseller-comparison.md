---
title: Bestseller Comparison
description: Practice using FIRST_VALUE and NTH_VALUE to analyze bestselling books
order: 130
type: challenge
setup: |
  ```sql
  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(100),
      category VARCHAR(50),
      copies_sold INT,
      price DECIMAL(10,2)
  );

  INSERT INTO book (id, title, category, copies_sold, price) VALUES
      (1, 'SQL Basics', 'Programming', 1500, 29.99),
      (2, 'Advanced SQL', 'Programming', 2500, 49.99),
      (3, 'Data Science', 'Data Analysis', 2000, 39.99),
      (4, 'Web Development', 'Programming', 1800, 34.99),
      (5, 'Statistics 101', 'Data Analysis', 1200, 24.99),
      (6, 'Python Basics', 'Programming', 3000, 29.99),
      (7, 'Machine Learning', 'Data Analysis', 2200, 44.99);
  ```
---

The bookstore wants to analyze their bestsellers in each category. For each book, they want to see how it compares to the top seller and second-best seller in its category.

Given the following data in table `book`:

| id  | title            | category      | copies_sold | price |
| --- | ---------------- | ------------- | ----------- | ----- |
| 1   | SQL Basics       | Programming   | 1500        | 29.99 |
| 2   | Advanced SQL     | Programming   | 2500        | 49.99 |
| 3   | Data Science     | Data Analysis | 2000        | 39.99 |
| 4   | Web Development  | Programming   | 1800        | 34.99 |
| 5   | Statistics 101   | Data Analysis | 1200        | 24.99 |
| 6   | Python Basics    | Programming   | 3000        | 29.99 |
| 7   | Machine Learning | Data Analysis | 2200        | 44.99 |

Write a query that shows:

- Book title
- Category
- Copies sold
- Title of the bestselling book in that category
- Title of the second-best selling book in that category

Order the results by category (ascending) and copies sold (descending).

## Expected Output

| title            | category      | copies_sold | category_bestseller | second_bestseller |
| ---------------- | ------------- | ----------- | ------------------- | ----------------- |
| Machine Learning | Data Analysis | 2200        | Machine Learning    | Data Science      |
| Data Science     | Data Analysis | 2000        | Machine Learning    | Data Science      |
| Statistics 101   | Data Analysis | 1200        | Machine Learning    | Data Science      |
| Python Basics    | Programming   | 3000        | Python Basics       | Advanced SQL      |
| Advanced SQL     | Programming   | 2500        | Python Basics       | Advanced SQL      |
| Web Development  | Programming   | 1800        | Python Basics       | Advanced SQL      |
| SQL Basics       | Programming   | 1500        | Python Basics       | Advanced SQL      |

## Solution

```sql
SELECT
    title,
    category,
    copies_sold,
    FIRST_VALUE(title) OVER (
        PARTITION BY category
        ORDER BY copies_sold DESC
    ) as category_bestseller,
    NTH_VALUE(title, 2) OVER (
        PARTITION BY category
        ORDER BY copies_sold DESC
        RANGE BETWEEN
            UNBOUNDED PRECEDING AND
            UNBOUNDED FOLLOWING
    ) as second_bestseller
FROM book
ORDER BY category, copies_sold DESC;
```

> Note: The `RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` clause ensures NTH_VALUE has access to all rows in the partition, not just the rows up to the current row.
