---
title: Handling Null Values
description: Learn how to handle null values in SQL.
order: 170
type: lesson-challenge
---

Null values represent missing or unknown values and can cause problems in SQL queries if not handled properly. In this lesson, we will learn different ways to handle null values in SQL.

> #### What are Null Values?
>
> Null values are not the same as empty strings or zero values. They are a separate data type that represents missing or unknown values.

## Querying for Null Values

Taking our book store example from our previous lessons, let's say that we have added a new column called `phone` to our `customers` table and started collecting phone numbers for our customers recently. Given below is a sample of our `customers` table.

| id  | name    | phone        | email               |
| --- | ------- | ------------ | ------------------- |
| 2   | Jane    | NULL         | jane@example.com    |
| 4   | Bob     | NULL         | bob@example.com     |
| 6   | David   | NULL         | david@example.com   |
| 1   | John    | 555-123-4567 | john@example.com    |
| 8   | Frank   | NULL         | frank@example.com   |
| 3   | Alice   | 555-987-6543 | alice@example.com   |
| 10  | Henry   | NULL         | henry@example.com   |
| 5   | Charlie | 555-555-5555 | charlie@example.com |
| 7   | Eve     | 555-777-8888 | eve@example.com     |
| 9   | Grace   | 555-444-3333 | grace@example.com   |

As you can see, some of our customers have not provided their phone numbers yet. To get a list of customers who have not provided their phone numbers yet, we can use the `WHERE` clause with the `IS NULL` operator.

```sql
SELECT *
FROM customers
WHERE phone IS NULL;
```

This query will return all the customers who have not provided their phone numbers yet.

| id  | name  | phone | email             |
| --- | ----- | ----- | ----------------- |
| 2   | Jane  | NULL  | jane@example.com  |
| 4   | Bob   | NULL  | bob@example.com   |
| 6   | David | NULL  | david@example.com |
| 10  | Henry | NULL  | henry@example.com |

## Querying for Non-Null Values

To get a list of customers who have provided their phone numbers, we can use the `WHERE` clause with the `IS NOT NULL` operator.

```sql
SELECT *
FROM customers
WHERE phone IS NOT NULL;
```

This query will return all the customers who have provided their phone numbers.

| id  | name    | phone        | email               |
| --- | ------- | ------------ | ------------------- |
| 1   | John    | 555-123-4567 | john@example.com    |
| 3   | Alice   | 555-987-6543 | alice@example.com   |
| 5   | Charlie | 555-555-5555 | charlie@example.com |
| 7   | Eve     | 555-777-8888 | eve@example.com     |
| 9   | Grace   | 555-444-3333 | grace@example.com   |

## Using the `COALESCE` Function

The `COALESCE` function is a useful way to handle null values in SQL. It returns the first non-null value in the list of arguments.

```sql
SELECT name, COALESCE(phone, '- missing -') AS phone, email
FROM customers;
```

This query will return the name of the customer and their phone number. If the phone number is `null`, it will return `- missing -` instead.

| name    | phone        | email               |
| ------- | ------------ | ------------------- |
| Jane    | - missing -  | jane@example.com    |
| Bob     | - missing -  | bob@example.com     |
| David   | - missing -  | david@example.com   |
| John    | 555-123-4567 | john@example.com    |
| Frank   | - missing -  | frank@example.com   |
| Alice   | 555-987-6543 | alice@example.com   |
| Henry   | - missing -  | henry@example.com   |
| Charlie | 555-555-5555 | charlie@example.com |
| Eve     | 555-777-8888 | eve@example.com     |
| Grace   | 555-444-3333 | grace@example.com   |