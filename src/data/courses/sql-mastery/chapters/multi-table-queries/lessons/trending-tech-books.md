---
title: Trending Tech Books
description: Practice using EXCEPT to identify potential technical book opportunities
order: 100
type: challenge
setup: |
  ```sql
  CREATE TABLE trending_book (
      title VARCHAR(255),
      author VARCHAR(255),
      rating DECIMAL(3,2),
      votes INT
  );

  CREATE TABLE tech_book (
      id INT PRIMARY KEY,
      title VARCHAR(255),
      category VARCHAR(100),
      price DECIMAL(10,2)
  );

  INSERT INTO trending_book (title, author, rating, votes)
  VALUES 
      ('Clean Code', 'Robert C. Martin', 4.8, 1205),
      ('The Pragmatic Programmer', 'Andy Hunt', 4.9, 890),
      ('Dune', 'Frank Herbert', 4.7, 2500),
      ('Project Hail Mary', 'Andy Weir', 4.8, 1800),
      ('Neuromancer', 'William Gibson', 4.5, 1600);

  INSERT INTO tech_book (id, title, category, price)
  VALUES 
      (1, 'Clean Code', 'Software Engineering', 44.99),
      (2, 'The Pragmatic Programmer', 'Software Engineering', 39.99),
      (3, 'JavaScript: The Good Parts', 'JavaScript', 29.99),
      (4, 'Python Crash Course', 'Python', 34.99),
      (5, 'Head First Java', 'Java', 44.99);
  ```
---

You have access to two tables: `trending_book` which tracks currently popular books across all genres, and `tech_book` which lists programming and technology books.

> `trending_book` table shows currently trending books:

| title                    | author           | rating | votes |
| ------------------------ | ---------------- | ------ | ----- |
| Clean Code               | Robert C. Martin | 4.8    | 1205  |
| The Pragmatic Programmer | Andy Hunt        | 4.9    | 890   |
| Dune                     | Frank Herbert    | 4.7    | 2500  |
| Project Hail Mary        | Andy Weir        | 4.8    | 1800  |
| Neuromancer              | William Gibson   | 4.5    | 1600  |

> `tech_book` table contains the technology book catalog:

| id  | title                      | category             | price |
| --- | -------------------------- | -------------------- | ----- |
| 1   | Clean Code                 | Software Engineering | 44.99 |
| 2   | The Pragmatic Programmer   | Software Engineering | 39.99 |
| 3   | JavaScript: The Good Parts | JavaScript           | 29.99 |
| 4   | Python Crash Course        | Python               | 34.99 |
| 5   | Head First Java            | Java                 | 44.99 |

Write a query to find the technical books that are not currently trending. This will help the publisher to review the books that are not currently popular and consider creating new editions or improving the existing ones.

## Expected Results

Your query should return:

| title                      |
| -------------------------- |
| Python Crash Course        |
| Head First Java            |
| JavaScript: The Good Parts |

## Solution

```sql
SELECT title
FROM tech_book
EXCEPT
SELECT title
FROM trending_book;
```
