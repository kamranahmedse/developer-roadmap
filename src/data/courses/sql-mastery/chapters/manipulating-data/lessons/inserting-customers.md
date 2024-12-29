---
title: Inserting Customers
description: Learn how to insert data into a table.
order: 100
type: challenge
setup: |
  ```sql
  - CREATE TABLE customers (  
    id INTEGER PRIMARY KEY,  
    name TEXT,  
    phone TEXT,  
    email TEXT  
    );  
  - INSERT INTO customers (id, name, phone, email)  
    VALUES  
    (1, 'John', '555-123-4567', 'john@example.com'),  
    (2, 'Jane', '555-987-6543', 'jane@example.com'),  
    (3, 'Bob', NULL, 'bob@example.com');
expectedResults:
  - columns: [id, name, phone, email]
    values:
      - [1, 'John', '555-123-4567', 'john@example.com']
      - [2, 'Jane', '555-987-6543', 'jane@example.com']
      - [3, 'Bob', NULL, 'bob@example.com']
---

Given the following `customers` table:

| id  | name | phone        | email            |
| --- | ---- | ------------ | ---------------- |
| 1   | John | 555-123-4567 | john@example.com |
| 2   | Jane | 555-987-6543 | jane@example.com |
| 3   | Bob  | NULL         | bob@example.com  |

Write a query to insert the following two new customers:

| Column  | Customer 1        | Customer 2        |
| ------- | ----------------- | ----------------- |
| `id`    | 4                 | 5                 |
| `name`  | Alice             | Smith             |
| `phone` | 555-444-3333      | `NULL`            |
| `email` | alice@example.com | smith@example.com |

## Result

After running your query, the `customers` table should look like this:

| id  | name  | phone        | email             |
| --- | ----- | ------------ | ----------------- |
| 1   | John  | 555-123-4567 | john@example.com  |
| 2   | Jane  | 555-987-6543 | jane@example.com  |
| 3   | Bob   | NULL         | bob@example.com   |
| 4   | Alice | 555-444-3333 | alice@example.com |
| 5   | Smith | NULL         | smith@example.com |
