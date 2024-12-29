---
title: Data Types Challenge
description: Create a table for bookstore inventory using appropriate SQL data types
order: 310
type: challenge
initSteps: []
expectedResults:
  - columns: [message]
    values:
      - ['Table created successfully']
---

You need to create a table named `book_inventory` for a bookstore system. The table should track detailed information about books using appropriate data types.

| Column           | Description                                    |
| ---------------- | ---------------------------------------------- |
| id               | Whole numbers for identification (Primary Key) |
| isbn             | Text of exactly 13 characters                  |
| title            | Variable-length text up to 200 characters      |
| author           | Variable-length text up to 100 characters      |
| price            | Number with 2 decimal places and precision 10  |
| pages            | Whole number                                   |
| in_stock         | True/False value                               |
| publication_date | Date only (no time)                            |
| last_updated     | Date and time together                         |

The only constraint you need to implement is that the `id` column should be a primary key. Apart from that, you are only being tested on the data types.

## Expected Output

After executing your query, the table should be created successfully with all specified columns using appropriate data types.