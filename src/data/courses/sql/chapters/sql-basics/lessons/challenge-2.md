---
title: Challenge 2
description: Write a SQL query to find the total number of orders in the `orders` table.
order: 300
type: challenge
initSteps:
  - CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    price REAL,
    discount REAL,
    markup REAL
    );
  - INSERT INTO books (id, title, price, discount, markup)
    VALUES
    (1, 'The Great Gatsby', 10.99, 0.10, 1.10),
    (2, 'To Kill a Mockingbird', 12.99, 0.15, 1.15),
    (3, '1984', 8.99, 0.05, 1.05),
    (4, 'The Catcher in the Rye', 11.99, 0.12, 1.12),
    (5, 'The Hobbit', 9.99, 0.08, 1.15);
expectedResults:
  - columns: [title, final_price]
    values:
      - ['The Great Gatsby', 11.99]
      - ['To Kill a Mockingbird', 13.99]
      - ['1984', 9.99]
      - ['The Catcher in the Rye', 12.99]
      - ['The Hobbit', 11.06]
---

Given the following `books` table:

| id  | title                  | price | discount | markup |
| --- | ---------------------- | ----- | -------- | ------ |
| 1   | The Great Gatsby       | 10.99 | 0.10     | 1.10   |
| 2   | To Kill a Mockingbird  | 12.99 | 0.15     | 1.15   |
| 3   | 1984                   | 8.99  | 0.05     | 1.05   |
| 4   | The Catcher in the Rye | 11.99 | 0.12     | 1.12   |
| 5   | The Hobbit             | 9.99  | 0.08     | 1.15   |

Write an SQL query that returns the `title`, `final_price` of each book. The `final_price` is calculated using the following formula:

```
final_price = price + markup - discount
```

## Expected Results

| title                  | final_price |
| ---------------------- | ----------- |
| The Great Gatsby       | 11.99       |
| To Kill a Mockingbird  | 13.99       |
| 1984                   | 9.99        |
| The Catcher in the Rye | 12.99       |
| The Hobbit             | 11.06       |
