---
title: Price Tier Rankings
description: Practice using RANK to analyze book sales across different price tiers
order: 160
type: challenge
setup: |
  ```sql
  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(100),
      category VARCHAR(50),
      price DECIMAL(10,2),
      copies_sold INT
  );

  INSERT INTO book (id, title, category, price, copies_sold) VALUES
      (1, 'SQL Basics', 'Programming', 29.99, 1500),
      (2, 'Advanced SQL', 'Programming', 49.99, 2500),
      (3, 'Data Science', 'Data Analysis', 39.99, 2000),
      (4, 'Web Development', 'Programming', 34.99, 1800),
      (5, 'Statistics 101', 'Data Analysis', 24.99, 1200),
      (6, 'Python Basics', 'Programming', 29.99, 3000),
      (7, 'Machine Learning', 'Data Analysis', 44.99, 2200),
      (8, 'Database Design', 'Programming', 49.99, 1700),
      (9, 'R Programming', 'Data Analysis', 34.99, 1600);
  ```
---

The bookstore wants to analyze how books perform within different price ranges. They want to identify the bestsellers in each price tier:

- Budget: Less than $30
- Standard: $30 to $40
- Premium: Over $40

Given the following data in table `book`:

| id  | title            | category      | price | copies_sold |
| --- | ---------------- | ------------- | ----- | ----------- |
| 1   | SQL Basics       | Programming   | 29.99 | 1500        |
| 2   | Advanced SQL     | Programming   | 49.99 | 2500        |
| 3   | Data Science     | Data Analysis | 39.99 | 2000        |
| 4   | Web Development  | Programming   | 34.99 | 1800        |
| 5   | Statistics 101   | Data Analysis | 24.99 | 1200        |
| 6   | Python Basics    | Programming   | 29.99 | 3000        |
| 7   | Machine Learning | Data Analysis | 44.99 | 2200        |
| 8   | Database Design  | Programming   | 49.99 | 1700        |
| 9   | R Programming    | Data Analysis | 34.99 | 1600        |

Write a query that shows:

- Book title
- Price tier (Budget/Standard/Premium)
- Price
- Copies sold
- Rank within price tier (based on copies sold)

Order the results by price tier (ascending) and rank within tier (ascending).

## Expected Output

| title            | price_tier | price | copies_sold | tier_rank |
| ---------------- | ---------- | ----- | ----------- | --------- |
| Python Basics    | Budget     | 29.99 | 3000        | 1         |
| SQL Basics       | Budget     | 29.99 | 1500        | 2         |
| Statistics 101   | Budget     | 24.99 | 1200        | 3         |
| Advanced SQL     | Premium    | 49.99 | 2500        | 1         |
| Machine Learning | Premium    | 44.99 | 2200        | 2         |
| Database Design  | Premium    | 49.99 | 1700        | 3         |
| Data Science     | Standard   | 39.99 | 2000        | 1         |
| Web Development  | Standard   | 34.99 | 1800        | 2         |
| R Programming    | Standard   | 34.99 | 1600        | 3         |

> **Hint:** You can use a `CASE` statement inside the `PARTITION BY` clause for partitioning the data into different price tiers i.e.
>
> ```sql
> PARTITION BY CASE
>     WHEN price < 30 THEN 'Budget'
>     WHEN price <= 40 THEN 'Standard'
>     ELSE 'Premium'
> END
> ```

## Solution

```sql
SELECT
    title,
    CASE
        WHEN price < 30 THEN 'Budget'
        WHEN price <= 40 THEN 'Standard'
        ELSE 'Premium'
    END as price_tier,
    price,
    copies_sold,
    RANK() OVER (
        PARTITION BY
            CASE
                WHEN price < 30 THEN 'Budget'
                WHEN price <= 40 THEN 'Standard'
                ELSE 'Premium'
            END
        ORDER BY copies_sold DESC
    ) as tier_rank
FROM book
ORDER BY price_tier, tier_rank;
```
