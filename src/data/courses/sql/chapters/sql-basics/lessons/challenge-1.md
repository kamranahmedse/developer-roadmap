---
title: Challenge 1
description: Write a SQL query to find the total number of orders in the `orders` table.
order: 300
type: challenge
initSteps:
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
    (3, 'Bob', NULL, 'bob@example.com'),
    (4, 'David', NULL, 'david@example.com'),
    (5, 'Charlie', '555-555-5555', 'charlie@example.com');
expectedResults:
  - columns: [Full Name, Email]
    values:
      - ['John', 'john@example.com']
      - ['Jane', 'jane@example.com']
      - ['Bob', 'bob@example.com']
      - ['David', 'david@example.com']
      - ['Charlie', 'charlie@example.com']
---

Given the following customers `customers` table:

| id  | name    | phone        | email               |
| --- | ------- | ------------ | ------------------- |
| 1   | John    | 555-123-4567 | john@example.com    |
| 2   | Jane    | 555-987-6543 | jane@example.com    |
| 3   | Bob     | NULL         | bob@example.com     |
| 4   | David   | NULL         | david@example.com   |
| 5   | Charlie | 555-555-5555 | charlie@example.com |

Write a query to get the `name` and `email` of all customers.

## Result

Your output should look like this:

| Full Name | Email               |
| --------- | ------------------- |
| John      | john@example.com    |
| Jane      | jane@example.com    |
| Bob       | bob@example.com     |
| David     | david@example.com   |
| Charlie   | charlie@example.com |

Notice that the `name` column is renamed to `Full Name` and the `email` column is renamed to `Email`.