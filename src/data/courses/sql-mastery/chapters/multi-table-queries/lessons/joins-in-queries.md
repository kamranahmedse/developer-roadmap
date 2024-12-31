---
title: JOINs in Queries
description: Learn how to query data across multiple tables using joins
order: 120
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE author (
      id INT PRIMARY KEY,
      name VARCHAR(255)
  );

  CREATE TABLE author_biography (
      id INT PRIMARY KEY,
      author_id INT,
      biography TEXT
  );

  INSERT INTO author (id, name)
  VALUES (1, 'John Doe'),
         (2, 'Jane Smith'),
         (3, 'Alice Johnson'),
         (4, 'Bob Brown');

  INSERT INTO author_biography (id, author_id, biography)
  VALUES (1, 4, 'Bob Brown\'s biography'),
         (2, 3, 'Alice Johnson\'s biography'),
         (3, 2, 'Jane Smith\'s biography'),
         (4, 1, 'John Doe\'s biography');
  ```
---

So far in this course, we have been mainly writing single-table queries. However, our previous lesson should have given you an idea of how data might not always be stored in a single table.

In this lesson, we will look at how to query data from multiple tables.

## What is a JOIN?

JOINs help us query data from multiple tables based on a related column between them. The result of a JOIN is a new table with related data and columns from all the tables that were joined.

Let's take an example to understand this better. Given the following two tables `author` and `author_biography`:

[![](https://assets.roadmap.sh/guest/author-biography-8evoz.png)](https://assets.roadmap.sh/guest/author-biography-8evoz.png)

Notice how `author_id` in the `author_biography` helps us relate each biography to an author. We can use this relationship to join the two tables and get each author along with their biography.

To do this, we can use the `JOIN` clause.

```sql
SELECT *
FROM author
JOIN author_biography ON author.id = author_biography.author_id;
--   ---------^------    ------------------^--------------------
--   Table to join with   Join condition to find matching rows
```

This query will return the following result set:

[![](https://assets.roadmap.sh/guest/author-join-biography-r5jtd.png)](https://assets.roadmap.sh/guest/author-join-biography-r5jtd.png)

Notice how the relevant biographies from `author_biography` are placed next to the relevant rows from the `author` table.

> I would encourage you to try this query out in the editor and see how it works.

### Selecting Specific Columns

If we only want to get the author id, name and biography, we can do so by selecting the relevant columns from the joined table.

```sql
SELECT author.id, author.name, author_biography.biography
FROM author
JOIN author_biography ON author.id = author_biography.author_id;
```

The output from this query will be:

| id  | name          | biography                 |
| --- | ------------- | ------------------------- |
| 4   | Bob Brown     | Bob Brown's biography     |
| 3   | Alice Johnson | Alice Johnson's biography |
| 2   | Jane Smith    | Jane Smith's biography    |
| 1   | John Doe      | John Doe's biography      |

The way this query works as follows:

**Step 1** `author` and `author_biography` are joined by verifying the `ON` condition i.e. `author.id = author_biography.author_id`.

![](https://assets.roadmap.sh/guest/step1-joining-tables-t9ms5.png)

**Step 2** Intermediate result is created with data from both tables.

![](https://assets.roadmap.sh/guest/step2-joined-tables-hf315.png)

**Step 3** Columns are returned based on `SELECT` clause.

![](https://assets.roadmap.sh/guest/step3-result-zhqzl.png)

### Using Aliases

We can also use aliases in the `FROM` and `JOIN` clauses.

```sql
-- Add aliases to the tables in the FROM clause
SELECT a.id, a.name, ab.biography
FROM author AS a
JOIN author_biography AS ab ON a.id = ab.author_id;

-- Using AS is optional i.e.
SELECT a.id, a.name, ab.biography
FROM author a
JOIN author_biography ab ON a.id = ab.author_id;
```

The result from this query will be the same as the previous query.



Let's take the same example our bookstore from our previous lesson. Among the tables we had in our bookstore, we had `customer` and `sale`. Here is some data we have in both tables respectively:

| id  | name          | email                     | phone      |
| --- | ------------- | ------------------------- | ---------- |
| 1   | John Doe      | john.doe@example.com      | 1234567890 |
| 2   | Jane Smith    | jane.smith@example.com    | 0987654321 |
| 3   | Alice Johnson | alice.johnson@example.com | 1122334455 |
| 4   | Bob Brown     | bob.brown@example.com     | 9988776655 |
| 5   | Charlie Davis | charlie.davis@example.com | 1231231230 |

| id  | customer_id | book_id | quantity | price  | date       |
| --- | ----------- | ------- | -------- | ------ | ---------- |
| 1   | 1           | 1       | 2        | 20.00  | 2024-01-01 |
| 2   | 2           | 2       | 3        | 45.00  | 2024-01-02 |
| 3   | 2           | 1       | 1        | 10.00  | 2024-02-03 |
| 4   | 1           | 1       | 1        | 10.00  | 2024-02-04 |
| 5   | 1           | 1       | 2        | 20.00  | 2024-02-05 |
| 6   | 5           | 3       | 1        | 30.00  | 2024-02-06 |
| 7   | 4           | 3       | 4        | 120.00 | 2024-02-07 |
| 8   | 3           | 4       | 1        | 25.00  | 2024-02-08 |
| 9   | 3           | 4       | 1        | 25.00  | 2024-02-09 |
| 10  | 5           | 4       | 2        | 50.00  | 2024-02-10 |

Notice how the `sale` table has a `customer_id` column that references the `id` column in the `customer` table. This is a relationship between the two tables.

We can use this relationship to query data from both tables.
