---
title: Same Price Books
description: Practice using joins to find books with the same price
order: 170
type: challenge
setup: |
  ```sql
  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(255),
      author VARCHAR(255),
      price DECIMAL(10,2)
  );

  INSERT INTO book (id, title, author, price)
  VALUES 
      (1, 'The Great Adventure', 'John Smith', 15.99),
      (2, 'Mystery of the Old House', 'Jane Doe', 12.50),
      (3, 'Tales of the Unknown', 'Robert Black', 15.99),
      (4, 'Science Wonders', 'Mary Johnson', 18.75),
      (5, 'Hidden Secrets', 'William White', 12.50);
  ```
---

The bookstore manager wants to create themed displays featuring books at the same price point. This will help customers find alternative options within their budget and potentially increase sales through these strategic pairings. Your task is to help identify which books share the same price to assist in creating these displays.

Given the following data in table `book`

| id  | title                    | author        | price |
| --- | ------------------------ | ------------- | ----- |
| 1   | The Great Adventure      | John Smith    | 15.99 |
| 2   | Mystery of the Old House | Jane Doe      | 12.50 |
| 3   | Tales of the Unknown     | Robert Black  | 15.99 |
| 4   | Science Wonders          | Mary Johnson  | 18.75 |
| 5   | Hidden Secrets           | William White | 12.50 |

Write a query to identify pairs of different books that share the same price. The manager wants to see:

- The title of the first book
- The title of the second book
- Their shared price

Note: Each pair should only appear once (e.g., if Book A and Book B are paired, we don't need to show Book B and Book A as another pair).

## Expected Output

| title_1                  | title_2              | price |
| ------------------------ | -------------------- | ----- |
| The Great Adventure      | Tales of the Unknown | 15.99 |
| Mystery of the Old House | Hidden Secrets       | 12.50 |

## Solution

```sql
SELECT
    b1.title AS title_1,
    b2.title AS title_2,
    b1.price
FROM book b1
JOIN book b2
    ON b1.price = b2.price
    AND b1.id < b2.id
ORDER BY b1.price DESC;
```

### Explanation

Let's break down how this query works:

We start by joining the book table with itself to find matching prices:

```sql
FROM book b1
JOIN book b2
    ON b1.price = b2.price
```

We add a condition to avoid duplicate pairs and self-matches:

```sql
AND b1.id < b2.id
```

This ensures that:

- We don't match a book with itself
- We only get each pair once (A-B but not B-A)

Finally, we order by price to group the pairs logically:

```sql
ORDER BY b1.price DESC
```

This query helps the manager identify books that can be displayed together at the same price point, making it easier for customers to find alternatives within their budget and potentially increasing sales through strategic book pairing.
