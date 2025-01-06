---
title: Membership Duration
description: Practice using date functions to calculate membership length and categories
order: 210
type: challenge
setup: |
  ```sql
  CREATE TABLE member (
      id INT PRIMARY KEY,
      name VARCHAR(100),
      join_date DATE
  );

  INSERT INTO member (id, name, join_date) VALUES
      (1, 'John Smith', '2022-01-15'),
      (2, 'Mary Johnson', '2023-06-20'),
      (3, 'Bob Wilson', '2024-01-10'),
      (4, 'Alice Brown', '2023-03-01'),
      (5, 'Charlie Davis', '2023-12-25');
  ```
---

The bookstore wants to categorize their members based on how long they've been part of the loyalty program. They need a report showing each member's duration and their corresponding membership tier.

Given the following data in table `member`

| id  | name          | join_date  |
| --- | ------------- | ---------- |
| 1   | John Smith    | 2022-01-15 |
| 2   | Mary Johnson  | 2023-06-20 |
| 3   | Bob Wilson    | 2024-01-10 |
| 4   | Alice Brown   | 2023-03-01 |
| 5   | Charlie Davis | 2023-12-25 |

Write a query that shows:

- Member's name
- Number of months they've been a member
- Membership tier:
  - `Bronze` if less than 6 months
  - `Silver` if between 6 and 12 months
  - `Gold` if between 12 and 24 months
  - `Platinum` if more than 24 months

## Expected Output

| name          | months | tier     |
| ------------- | ------ | -------- |
| John Smith    | 35     | Platinum |
| Alice Brown   | 22     | Gold     |
| Mary Johnson  | 18     | Gold     |
| Charlie Davis | 12     | Gold     |
| Bob Wilson    | 11     | Silver   |

> **Note:** The months will vary based on current date. This example assumes CURRENT_DATE is '2025-01-06'.

## Solution

```sql
SELECT
    name,
    EXTRACT(YEAR FROM AGE(CURRENT_DATE, join_date)) * 12 +
    EXTRACT(MONTH FROM AGE(CURRENT_DATE, join_date)) AS months,
    CASE
        WHEN AGE(CURRENT_DATE, join_date) < INTERVAL '6 months' THEN 'Bronze'
        WHEN AGE(CURRENT_DATE, join_date) < INTERVAL '12 months' THEN 'Silver'
        WHEN AGE(CURRENT_DATE, join_date) < INTERVAL '24 months' THEN 'Gold'
        ELSE 'Platinum'
    END AS tier
FROM member
ORDER BY months DESC;
```
