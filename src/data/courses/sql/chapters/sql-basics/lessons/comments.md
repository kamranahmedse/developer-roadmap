---
title: Comments
description: Learn how to add comments to your SQL queries.
order: 180
type: lesson-challenge
---

Comments are a way to add notes to your SQL queries. They are not executed by the database and are only used to explain what the query is doing.

## Single Line Comments

Single line comments are created using `--` followed by the comment text. For example, in the following queries we have added some single line comments showing how you can use them.

```sql
-- This is a single line comment
-- you can add as many comments as you want.
-- They are ignored by the database.
SELECT * FROM customers;

-- You can use them to comment 
-- out parts of your query.
SELECT * FROM customers; -- WHERE id = 1;

-- Add notes to your query for later reference.
SELECT * 
FROM customers 
WHERE country = 'USA';  -- USA users only
```

## Multi Line Comments

Multi line comments are created using `/*` followed by the comment text and `*/`. For example, in the following query, we have added some multi line comments showing how you can use them.

```sql
/*
  This is a multi line comment
  It can span multiple lines
*/
SELECT * FROM customers;

/*
    -- Other queries for our database
    SELECT * FROM customers;
    SELECT * FROM orders;
    SELECT * FROM books;
*/

-- You can also use them to comment 
-- out parts of your query. e.g. 
-- here we are commenting out the
-- country condition so we are only 
-- getting orders that are shipped.
SELECT * 
FROM orders 
WHERE /* country = 'USA' AND */ status = 'shipped';
```