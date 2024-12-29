---
title: Sales Data Analysis
description: Practice querying temporal data from a bookstore's sales records
order: 340
type: challenge
setup: |
  ```sql
  CREATE TABLE sales (
      id INTEGER PRIMARY KEY,
      book_title VARCHAR(100),
      sale_date DATE,
      quantity INTEGER,
      amount DECIMAL(10,2)
  );

  INSERT INTO sales (id, book_title, sale_date, quantity, amount) VALUES
      (1, 'The Great Gatsby', '2024-03-15', 2, 25.98),
      (2, 'To Kill a Mockingbird', '2024-03-15', 1, 14.99),
      (3, '1984', '2024-12-10', 3, 35.97),
      (4, 'Pride and Prejudice', '2024-03-16', 1, 9.99),
      (5, 'The Hobbit', '2024-10-17', 2, 33.98),
      (6, 'The Great Gatsby', '2024-03-17', 1, 12.99),
      (7, 'Dune', '2024-05-18', 4, 79.96),
      (8, 'The Hobbit', '2024-03-18', 1, 16.99),
      (9, '1984', '2024-03-19', 2, 23.98),
      (10, 'Pride and Prejudice', '2024-03-19', 3, 29.97);
  ```
---

Given the following `sales` table containing the books sales data:

| id  | book_title            | sale_date  | quantity | amount |
| --- | --------------------- | ---------- | -------- | ------ |
| 1   | The Great Gatsby      | 2024-03-15 | 2        | 25.98  |
| 2   | To Kill a Mockingbird | 2024-03-15 | 1        | 14.99  |
| 3   | 1984                  | 2024-12-10 | 3        | 35.97  |
| 4   | Pride and Prejudice   | 2024-03-16 | 1        | 9.99   |
| 5   | The Hobbit            | 2024-10-17 | 2        | 33.98  |
| 6   | The Great Gatsby      | 2024-03-17 | 1        | 12.99  |
| 7   | Dune                  | 2024-05-18 | 4        | 79.96  |
| 8   | The Hobbit            | 2024-03-18 | 1        | 16.99  |
| 9   | 1984                  | 2024-03-19 | 2        | 23.98  |
| 10  | Pride and Prejudice   | 2024-03-19 | 3        | 29.97  |

with following data types of columns:

| Column     | Type          |
| ---------- | ------------- |
| id         | INTEGER       |
| book_title | VARCHAR(100)  |
| sale_date  | DATE          |
| quantity   | INTEGER       |
| amount     | DECIMAL(10,2) |

Write a query to help the store manager find the sales based on the following criteria:

- All sales that happened between `2024-05-16` and `2024-12-18` (inclusive)
- Only include sales where the `quantity` sold was more than `1`
- Order the results by `sale_date`, and then by `amount` in descending order
- Show only the `book_title`, `sale_date`, `quantity`, `sale_quarter` and `amount` columns
- Format the `sale_date` as `Month Day, Year` e.g. `December 10, 2024`
- `sale_quarter` should contain the quarter of the year when the sale happened. You can use the `EXTRACT` function to get the quarter of the year from the `sale_date` column.
- To format the `sale_date` column, you can use the `TO_CHAR` function with `TO_CHAR(sale_date, 'Month DD, YYYY')`.

## Expected Output

The result should look like this:

| book_title | sale_date         | quantity | sale_quarter | amount |
| ---------- | ----------------- | -------- | ------------ | ------ |
| 1984       | December 10, 2024 | 3        | 4            | 35.97  |
| The Hobbit | October 17, 2024  | 2        | 4            | 33.98  |
| Dune       | May 18, 2024      | 4        | 2            | 79.96  |

## Solution

```sql
SELECT
    book_title,
    TO_CHAR(sale_date, 'Month DD, YYYY') AS sale_date,
    quantity,
    EXTRACT(QUARTER FROM sale_date) AS sale_quarter,
    amount
FROM sales
WHERE sale_date BETWEEN '2024-05-16' AND '2024-12-18'
  AND quantity > 1
ORDER BY sale_date, amount DESC;
```
