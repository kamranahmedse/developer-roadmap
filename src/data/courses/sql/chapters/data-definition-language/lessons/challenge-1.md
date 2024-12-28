---
title: Challenge 1
description: Write a SQL query to create a `books` table with specific columns.
order: 300
type: challenge
initSteps: []
expectedResults:
  - columns: [message]
    values:
      - ['Table created successfully']
---

You are tasked with creating a table named `books` for a bookstore database. The table should have the following columns:

| Column Name    | Data Type      | Constraints       |
| -------------- | -------------- | ----------------- |
| id             | INTEGER        | PRIMARY KEY       |
| title          | TEXT           | NOT NULL          |
| author         | TEXT           | NOT NULL          |
| genre          | TEXT           |                   |
| price          | NUMERIC(10, 2) | CHECK (price > 0) |
| published_date | DATE           |                   |

### Requirements

1. The `id` column should uniquely identify each book.
2. The `title` and `author` columns cannot be null.
3. The `price` column must be greater than 0.

### Task

Write a SQL query to create the `books` table as described above.

### Expected Output

After running your query, the output should confirm the creation of the table:

| message                    |
| -------------------------- |
| Table created successfully |

### Example Query (Partial)

```sql
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT,
  price NUMERIC(10, 2) CHECK (price > 0),
  published_date DATE
);
```

Now, complete the challenge and create the table!
