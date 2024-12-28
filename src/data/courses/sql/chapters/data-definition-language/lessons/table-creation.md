---
title: Table Creation
description: Write a SQL query to create a `books` table with specific columns.
order: 300
type: challenge
initSteps: []
expectedResults:
  - columns: [message]
    values:
      - ['Table created successfully']
---

You are required to create a table named `books` for a bookstore database. The table should have the following columns:

| Column Name    | Data Type      | Constraints       |
| -------------- | -------------- | ----------------- |
| id             | INTEGER        | PRIMARY KEY       |
| title          | VARCHAR(250)   | NOT NULL          |
| author         | VARCHAR(250)   | NOT NULL          |
| genre          | VARCHAR(250)   |                   |
| price          | DECIMAL(10, 2) | CHECK (price > 0) |
| published_date | DATE           |                   |

Table should have following constraints in place:

- The `id` column should uniquely identify each book.
- The `title` and `author` columns cannot be `NULL`.
- The `price` column must be greater than `0`.

## Expected Output

After executing the query, there should be no errors and the table should be created successfully.
