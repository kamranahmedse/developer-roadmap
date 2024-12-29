---
title: Simple Table Creation
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

| Column Name    | Data Type      |
| -------------- | -------------- |
| id             | `INTEGER`      |
| title          | `VARCHAR(250)` |
| author         | `VARCHAR(250)` |
| genre          | `VARCHAR(250)` |
| published_date | `DATE`         |

Create a simple table with these columns using basic data types.

## Expected Output

After executing the query, there should be no errors and the table should be created successfully. You can verify the schema under the `Schema` tab.
