---
title: Sorting Challenge
description: Write a SQL query to find the total number of orders in the `orders` table.
order: 350
type: challenge
initSteps:
  - CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    genre TEXT,
    price REAL,
    stock INTEGER,
    year INTEGER
    );
  - INSERT INTO books (id, title, genre, price, stock, year)
    VALUES
    (1, 'The Great Adventure', 'Fiction', 15.99, 12, 2020),
    (2, 'Mystery of the Night', 'Mystery', 12.50, 5, 2018),
    (3, 'Science Explained', 'Science', 20.00, 0, 2019),
    (4, 'Cooking Made Easy', 'Cooking', 18.99, 8, 2021),
    (5, 'History Revisited', 'History', 10.99, 20, 2017),
    (6, 'Fictional Reality', 'Fiction', 25.99, 3, 2022);
expectedResults:
  - columns: [id, title, genre, price, stock, year]
    values:
      - [1, 'The Great Adventure', 'Fiction', 15.99, 12, 2020]
      - [3, 'Science Explained', 'Science', 20.00, 0, 2019]
---

Given the following `books` table:

| id  | title                | genre   | price | stock | year |
| --- | -------------------- | ------- | ----- | ----- | ---- |
| 1   | The Great Adventure  | Fiction | 15.99 | 12    | 2020 |
| 2   | Mystery of the Night | Mystery | 12.50 | 5     | 2018 |
| 3   | Science Explained    | Science | 20.00 | 0     | 2019 |
| 4   | Cooking Made Easy    | Cooking | 18.99 | 8     | 2021 |
| 5   | History Revisited    | History | 10.99 | 20    | 2017 |
| 6   | Fictional Reality    | Fiction | 25.99 | 3     | 2022 |

Write a query to retrieve `books` that meet the following criteria and order them as specified:

- The `genre` must be either Fiction or Science.
- The `price` should be `>= 10` and `<= 20`.

Here are the sorting requirements:

- First, sort the results by **stock** in **descending order** (books with more stock appear first).
- If two books have the same stock, sort them by **price** in ascending order.

## Expected Results

| id  | title               | genre   | price | stock | year |
| --- | ------------------- | ------- | ----- | ----- | ---- |
| 1   | The Great Adventure | Fiction | 15.99 | 12    | 2020 |
| 3   | Science Explained   | Science | 20.00 | 0     | 2019 |
