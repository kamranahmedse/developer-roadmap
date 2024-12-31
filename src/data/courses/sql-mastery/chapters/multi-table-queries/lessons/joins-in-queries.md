---
title: JOINs in Queries
description: Learn how to query data across multiple tables using joins
order: 120
type: lesson-challenge
setup: |
  ```sql
    CREATE TABLE dress (
      id INT PRIMARY KEY,
      dress_name VARCHAR(255)
    );

    CREATE TABLE color (
      id INT PRIMARY KEY,
      color_name VARCHAR(255)
    );

    INSERT INTO dress (id, dress_name)

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
         (4, 'Bob Brown'),
         (5, 'Samantha Jay'),
         (6, 'Nicola Bateman');


  INSERT INTO author_biography (id, author_id, biography)
  VALUES (1, 4, 'Bob Brown''s biography'),
         (2, 3, 'Alice Johnson''s biography'),
         (3, 2, 'Jane Smith''s biography'),
         (4, 1, 'John Doe''s biography');

  CREATE TABLE customer (
      id INT PRIMARY KEY,
      name VARCHAR(255)
  );

  CREATE TABLE sale (
      id INT PRIMARY KEY,
      customer_id INT,
      book_id INT,
      amount DECIMAL(10, 2),
      created_at DATE
  );

  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(255),
      category VARCHAR(255)
  );

  INSERT INTO customer (id, name)
  VALUES (1, 'John Doe'),
         (2, 'Jane Smith'),
         (3, 'Will Scott'),
         (4, 'Bob Green');

  INSERT INTO sale (id, customer_id, book_id, amount, created_at)
  VALUES (1, 1, 1, 10.99, '2024-12-30'),
         (2, 1, 2, 25.98, '2024-12-10'),
         (3, 2, 1, 32.97, '2024-12-31'),
         (4, 1, 1, 34.11, '2024-12-11'),
         (5, 3, 3, 14.66, '2024-12-08'),
         (6, 2, 3, 36.22, '2024-12-07');

  INSERT INTO book (id, title, category)
  VALUES (1, 'Harry Potter', 'Fantasy'),
         (2, 'Lord of the Rings', 'Fantasy'),
         (3, 'Pride and Prejudice', 'Romance'),
         (4, 'Wuthering Heights', 'Tragedy');
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

## Types of JOINs

SQL provides several types of JOINs, each with its own behavior and use cases. Here is the list of most common types:

- `INNER JOIN`
- `LEFT JOIN` (or `LEFT OUTER JOIN`)
- `RIGHT JOIN` (or `RIGHT OUTER JOIN`)
- `FULL JOIN` (or `FULL OUTER JOIN`)
- `CROSS JOIN`

If you notice our queries so far, we have been simply using `JOIN` in our queries. This is actually an alias for `INNER JOIN`; if you don't specify the type of join, it will default to `INNER JOIN`.

The actual syntax for a `JOIN` query is as follows:

```sql
SELECT table1.column1, table2.column1, ...
FROM table1
join_type JOIN table2
ON join_conditions;
```

`join_type` can be one of the types of joins and `join_conditions` is the condition to join the mentioned tables. Let's go through each of the types to understand how they work.

### INNER JOIN

The `INNER JOIN` is the most commonly used type of join. It returns only the matching rows from both tables. Any rows that do not have a match in the other table are not included in the result.

#### Example 1 - One-to-One Relationship

Let's take an example to understand this better. We will use the same `author` and `author_biography` tables as before with following data.

![author-biography-data](https://assets.roadmap.sh/guest/author-no-biography-x74fu.png)

Now, if we run the following query:

```sql
SELECT a.name, ab.biography
FROM author a
INNER JOIN author_biography ab ON a.id = ab.author_id;
```

The result from this query will be:

| name          | biography                 |
| ------------- | ------------------------- |
| Bob Brown     | Bob Brown's biography     |
| Alice Johnson | Alice Johnson's biography |
| Jane Smith    | Jane Smith's biography    |
| John Doe      | John Doe's biography      |

Notice how the authors "Samantha Jay" and "Nicola Bateman" are not included in the result as they do not have a biography.

> Note: `JOIN` is the alias for `INNER JOIN` in SQL. However you should always specify the type of join explicitly to make your queries more readable and maintainable.

#### Example 2 - One-to-Many Relationship

Let's take another example to make sure that we understand the `INNER JOIN` better. In our next example we will use the `customer` and `sale` table with following data.

![](https://assets.roadmap.sh/guest/customer-sale-tqbjq.png)

There is a one-to-many relationship between `customer` and `sale` tables i.e. a customer can have 0 or more sales. Let's say we want to get all the customers along with their sales.

```sql
SELECT c.name, s.amount
FROM customer c
INNER JOIN sale s ON c.id = s.customer_id;
```

The result from this query will be:

| name          | amount |
| ------------- | ------ |
| John Doe      | 10.99  |
| John Doe      | 25.98  |
| Jane Smith    | 32.97  |
| John Doe      | 34.11  |
| Alice Johnson | 14.66  |
| Jane Smith    | 36.22  |

Notice how the customers "Will Scott" and "Bob Green" are not included in the result as they do not have any sales. Also notice how the customers "John Doe" and "Jane Smith" have two sales each so we get two rows for them in the result.

#### Example 3 - Many-to-Many Relationship

In this last example we will look at a many-to-many relationship. We will use the `customer`, `sale` and `book` table with following data.

![](https://assets.roadmap.sh/guest/customer-book-sale-6n4n4.png)

Let's say we want to get all the customers along with their sale amount and book title. In this case will need to have two `INNER JOIN` clauses to join the `customer`, `sale` table first and then join the `sale` table with the `book` table.

Our query will look like this:

```sql
SELECT c.name, s.amount, b.title, TO_CHAR(s.created_at, 'YYYY-MM-DD') AS sale_date
FROM customer c
INNER JOIN sale s ON c.id = s.customer_id
INNER JOIN book b ON s.book_id = b.id;
```

The result from this query will be:

| name       | amount | title               | sale_date  |
| ---------- | ------ | ------------------- | ---------- |
| John Doe   | 10.99  | Harry Potter        | 2024-12-30 |
| John Doe   | 25.98  | Lord of the Rings   | 2024-12-10 |
| Jane Smith | 32.97  | Harry Potter        | 2024-12-31 |
| John Doe   | 34.11  | Harry Potter        | 2024-12-11 |
| Will Scott | 14.66  | Pride and Prejudice | 2024-12-08 |
| Jane Smith | 36.22  | Pride and Prejudice | 2024-12-07 |

Here is how the query works:

**Step 1** `customer` and `sale` tables are joined by verifying the `ON` condition i.e. `c.id = s.customer_id`.

![](https://assets.roadmap.sh/guest/customer-join-sale-sd3u5.png)

**Step 2** Intermediate result is created with data from both tables.

![](https://assets.roadmap.sh/guest/customer-join-sale-result-su1jd.png)

**Step 3** This intermediate result is then joined with the `book` table by verifying the `ON` condition i.e. `s.book_id = b.id`.

![](https://assets.roadmap.sh/guest/customer-sale-book-sjovk.png)

**Step 4** Intermediate result is created with data from all three tables.

[![](https://assets.roadmap.sh/guest/data-from-all-tables-xwtw4.png)](https://assets.roadmap.sh/guest/data-from-all-tables-xwtw4.png)

**Step 5** Columns are returned based on `SELECT` clause.

![](https://assets.roadmap.sh/guest/many-to-many-result-tum5k.png)

### LEFT JOIN

The `LEFT JOIN` (or `LEFT OUTER JOIN`) returns all rows from the left table and matching rows from the right table. If no match is found, `NULL` values are returned for the right table's columns.

Taking the same `author` and `author_biography` tables, let's say we want to get all the authors and their biographies.

![](https://assets.roadmap.sh/guest/author-no-biography-x74fu.png)

The query using `LEFT JOIN` will look like this:

```sql
SELECT a.name, ab.biography
FROM author a
LEFT JOIN author_biography ab ON a.id = ab.author_id;
```

The result from this query will be:

| name           | biography                 |
| -------------- | ------------------------- |
| Bob Brown      | Bob Brown's biography     |
| Alice Johnson  | Alice Johnson's biography |
| Jane Smith     | Jane Smith's biography    |
| John Doe       | John Doe's biography      |
| Samantha Jay   | `null`                    |
| Nicola Bateman | `null`                    |

Notice how the authors "Samantha Jay" and "Nicola Bateman" are included in the result with `NULL` values for the biography column. If we had used `INNER JOIN` instead, they would not have been included in the result.

Left join is useful when you want to ensure that all rows from the left table are included in the result, even if there are no matching rows in the right table. For example, in our books example, if you want to get all the customers along with their number of sales, you can use `LEFT JOIN` to ensure that all customers are included in the result, even if they don't have any sales.

> We will look at more examples when we learn about aggregate functions in the future chapters.

### RIGHT JOIN

The `RIGHT JOIN` (or `RIGHT OUTER JOIN`) is similar to LEFT JOIN but returns all rows from the right table but only the matching rows from the left table.

For example, let's simulate a scenario where we have an entry inside `author_biography` for an `author` that does not exist. Running the following `RIGHT JOIN` query will return all the biographies including the one for the author that does not exist:

```sql
-- We don't have an author with id 10
INSERT INTO author_biography (id, author_id, biography)
VALUES (5, 10, 'Missing author biography');

-- Now let's use RIGHT JOIN for joining the tables
SELECT a.name, ab.biography
FROM author a
RIGHT JOIN author_biography ab ON a.id = ab.author_id;
```

The output from this query will be:

| name          | biography                 |
| ------------- | ------------------------- |
| Bob Brown     | Bob Brown's biography     |
| Alice Johnson | Alice Johnson's biography |
| Jane Smith    | Jane Smith's biography    |
| John Doe      | John Doe's biography      |
| `null`        | Missing author biography  |

Notice we have a "Missing author biography" row in the result with author name set to `null`.

> As an exercise, try running the same query with `INNER JOIN` and `LEFT JOIN` and see the difference in results.

### FULL JOIN

The `FULL JOIN` (or `FULL OUTER JOIN`) returns all rows from both tables. If there's no match, NULL values are returned for the table that doesn't have a matching row.

Let's use the same `author` and `author_biography` tables to understand this better.

```sql
-- We don't have an author with id 10
INSERT INTO author_biography (id, author_id, biography)
VALUES (5, 10, 'Missing author biography');

-- I already have some authors with missing biographies
-- So no need to set them up in the editor.

-- Now let's use FULL JOIN for joining the tables
SELECT a.name, ab.biography
FROM author a
FULL JOIN author_biography ab ON a.id = ab.author_id;
```

The output from this query will be:

| name           | biography                 |
| -------------- | ------------------------- |
| Bob Brown      | Bob Brown's biography     |
| Alice Johnson  | Alice Johnson's biography |
| Jane Smith     | Jane Smith's biography    |
| John Doe       | John Doe's biography      |
| `null`         | Missing author biography  |
| Samantha Jay   | `null`                    |
| Nicola Bateman | `null`                    |

Notice how the authors "Samantha Jay" and "Nicola Bateman" are included in the result with `NULL` values for the biography column. Similarly, there is a "Missing author biography" row in the result with author name set to `null`.

### CROSS JOIN

A `CROSS JOIN` returns the Cartesian product of both tables (i.e. every row from the first table paired with every row from the second table). It doesn't require a join condition.

Consider the two tables `dress` and `color` with following data:

| dress_id | dress_name |
| -------- | ---------- |
| 1        | Dress 1    |
| 2        | Dress 2    |
| 3        | Dress 3    |
| 4        | Dress 4    |

| color_id | color_name |
| -------- | ---------- |
| 1        | Red        |
| 2        | Blue       |
| 3        | Green      |
| 4        | Yellow     |

I have already set up the data in the editor. Now let's run the following query:

```sql
SELECT d.dress_name, c.color_name
FROM dress d
CROSS JOIN color c;
```

This would result in 16 rows (4 dresses × 4 colors) where every dress is paired with every color, regardless of the dress_id relationship.

![](https://assets.roadmap.sh/guest/dress-color-s0z98.png)

The result from this query will be:

| dress_name | color_name |
| ---------- | ---------- |
| Dress 1    | Red        |
| Dress 1    | Blue       |
| Dress 1    | Green      |
| Dress 1    | Yellow     |
| Dress 2    | Blue       |
| Dress 2    | Green      |
| Dress 2    | Yellow     |
| Dress 3    | Red        |
| Dress 3    | Blue       |
| Dress 3    | Green      |
| Dress 3    | Yellow     |
| Dress 4    | Red        |
| Dress 4    | Blue       |
| Dress 4    | Green      |
| Dress 4    | Yellow     |

---

Now that you understand different types of JOINs, you can choose the appropriate one based on your specific needs. In the future lessons, we will look at more complex scenarios involving multiple JOINs.
