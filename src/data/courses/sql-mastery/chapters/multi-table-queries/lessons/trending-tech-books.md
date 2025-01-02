---
title: Trending Tech Books
description: Practice using EXCEPT to identify potential technical book opportunities
order: 200
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

The bookstore's marketing team wants to boost sales in the technology section. They've noticed some tech books aren't getting as much attention as others and want to identify which technical books aren't currently trending. This information will help them plan targeted promotions and display adjustments to increase visibility for these underperforming titles.

Given the following data in table `trending_book`

| title                    | author           | rating | votes |
| ------------------------ | ---------------- | ------ | ----- |
| Clean Code               | Robert C. Martin | 4.8    | 1205  |
| The Pragmatic Programmer | Andy Hunt        | 4.9    | 890   |
| Dune                     | Frank Herbert    | 4.7    | 2500  |
| Project Hail Mary        | Andy Weir        | 4.8    | 1800  |
| Neuromancer              | William Gibson   | 4.5    | 1600  |

And the following data in table `tech_book`

| id  | title                      | category             | price |
| --- | -------------------------- | -------------------- | ----- |
| 1   | Clean Code                 | Software Engineering | 44.99 |
| 2   | The Pragmatic Programmer   | Software Engineering | 39.99 |
| 3   | JavaScript: The Good Parts | JavaScript           | 29.99 |
| 4   | Python Crash Course        | Python               | 34.99 |
| 5   | Head First Java            | Java                 | 44.99 |

Write a query to identify technical books that aren't currently in the trending list. The marketing team wants to see:

- The title of each non-trending technical book

## Expected Output

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
FROM trending_book
ORDER BY title;
```

### Explanation

Let's break down how this query works:

First, we get all titles from the technical books catalog:

```sql
SELECT title
FROM tech_book
```

Then we use `EXCEPT` to remove any titles that appear in the trending books list:

```sql
EXCEPT
SELECT title
FROM trending_book
```

The `EXCEPT` operator returns all rows from the first query that don't appear in the results of the second query. This effectively gives us all technical books that aren't trending.

Finally, we order the results alphabetically:

```sql
ORDER BY title
```

This query helps the marketing team identify which technical books might need additional promotion or better placement in the store. They can use this information to create targeted marketing campaigns or special displays for these books to increase their visibility and sales.
