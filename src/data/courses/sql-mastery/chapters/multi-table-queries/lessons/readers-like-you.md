---
title: Readers Like You
description: Practice using joins to find customers who share reading interests with a specific customer
order: 160
type: challenge
setup: |
  ```sql
  CREATE TABLE customer (
      id INT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255)
  );

  CREATE TABLE sale (
    id INT PRIMARY KEY,
    customer_id INT,
    book_id INT,
    order_date DATE,
    total_amount DECIMAL(10,2)
  );

  CREATE TABLE book (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255)
  );

  INSERT INTO book (id, title, author)
  VALUES 
      (1, 'The Great Gatsby', 'F. Scott Fitzgerald'),
      (2, 'To Kill a Mockingbird', 'Harper Lee'),
      (3, '1984', 'George Orwell'),
      (4, 'Pride and Prejudice', 'Jane Austen'),
      (5, 'The Catcher in the Rye', 'J.D. Salinger');

  INSERT INTO customer (id, name, email)
  VALUES 
      (1, 'Alice Smith', 'alice@example.com'),
      (2, 'Bob Johnson', 'bob@example.com'),
      (3, 'Carol White', 'carol@example.com'),
      (4, 'David Brown', 'david@example.com'),
      (5, 'Emily Davis', 'emily@example.com'),
      (6, 'Frank Wilson', 'frank@example.com'),
      (7, 'Grace Taylor', 'grace@example.com');

  INSERT INTO sale (id, customer_id, book_id, order_date, total_amount)
  VALUES 
      (1, 1, 1, '2024-01-01', 10.00),  -- Alice: Great Gatsby
      (2, 1, 2, '2024-01-15', 15.00),  -- Alice: Mockingbird
      (3, 1, 3, '2024-02-01', 20.00),  -- Alice: 1984
      (4, 2, 1, '2024-02-15', 10.00),  -- Bob: Great Gatsby
      (5, 2, 3, '2024-03-01', 20.00),  -- Bob: 1984
      (6, 3, 2, '2024-03-15', 15.00),  -- Carol: Mockingbird
      (7, 3, 3, '2024-04-01', 20.00),  -- Carol: 1984
      (8, 4, 1, '2024-04-15', 10.00),  -- David: Great Gatsby
      (9, 5, 4, '2024-05-01', 25.00),  -- Emily: Pride and Prejudice
      (10, 6, 3, '2024-05-15', 20.00); -- Frank: 1984
  ```
---

The bookstore wants to implement a "Readers Like You" feature that shows customers who have similar reading interests. Given a specific customer ID, we want to find all other customers who have purchased at least one of the same books.

Given the following data in table `customer`

| id  | name         | email             |
| --- | ------------ | ----------------- |
| 1   | Alice Smith  | alice@example.com |
| 2   | Bob Johnson  | bob@example.com   |
| 3   | Carol White  | carol@example.com |
| 4   | David Brown  | david@example.com |
| 5   | Emily Davis  | emily@example.com |
| 6   | Frank Wilson | frank@example.com |
| 7   | Grace Taylor | grace@example.com |

The following data in table `sale`

| id  | customer_id | book_id | order_date | total_amount |
| --- | ----------- | ------- | ---------- | ------------ |
| 1   | 1           | 1       | 2024-01-01 | 10.00        |
| 2   | 1           | 2       | 2024-01-15 | 15.00        |
| 3   | 1           | 3       | 2024-02-01 | 20.00        |
| 4   | 2           | 1       | 2024-02-15 | 10.00        |
| 5   | 2           | 3       | 2024-03-01 | 20.00        |
| 6   | 3           | 2       | 2024-03-15 | 15.00        |
| 7   | 3           | 3       | 2024-04-01 | 20.00        |
| 8   | 4           | 1       | 2024-04-15 | 10.00        |
| 9   | 5           | 4       | 2024-05-01 | 25.00        |
| 10  | 6           | 3       | 2024-05-15 | 20.00        |

And the following data in table `book`

| id  | title                  | author              |
| --- | ---------------------- | ------------------- |
| 1   | The Great Gatsby       | F. Scott Fitzgerald |
| 2   | To Kill a Mockingbird  | Harper Lee          |
| 3   | 1984                   | George Orwell       |
| 4   | Pride and Prejudice    | Jane Austen         |
| 5   | The Catcher in the Rye | J.D. Salinger       |

Write a query that takes customer ID `1` (Alice Smith) and finds all other customers who have purchased any of the same books as Alice, along with the books they have in common.

Your output should contain the following columns:

- `customer_name` - name of the other customer
- `common_book` - title of the book they both purchased
- `purchase_date` - when the other customer purchased the book

## Expected Output

| customer_name | common_book           | purchase_date            |
| ------------- | --------------------- | ------------------------ |
| Bob Johnson   | 1984                  | 2024-03-01T00:00:00.000Z |
| Bob Johnson   | The Great Gatsby      | 2024-02-15T00:00:00.000Z |
| Carol White   | 1984                  | 2024-04-01T00:00:00.000Z |
| Carol White   | To Kill a Mockingbird | 2024-03-15T00:00:00.000Z |
| David Brown   | The Great Gatsby      | 2024-04-15T00:00:00.000Z |
| Frank Wilson  | 1984                  | 2024-05-15T00:00:00.000Z |

## Solution

```sql
SELECT
    c2.name AS customer_name,
    b.title AS common_book,
    s2.order_date AS purchase_date
FROM sale s1
    INNER JOIN sale s2
        ON s1.book_id = s2.book_id
        AND s1.customer_id = 1
        AND s2.customer_id != 1
    INNER JOIN customer c2
        ON s2.customer_id = c2.id
    INNER JOIN book b
        ON s1.book_id = b.id
ORDER BY c2.name, b.title;
```

## Explanation

Let's break down how this query works:

We first start with all the purchases of Alice (customer_id = 1) to find the books she has purchased i.e.

```sql
FROM sale s1
```

Now, because we want to find all the other sales that have the same book_id as Alice's sales, we need to join the `sale` table again (aliased as `s2`) to compare purchases:

```sql
INNER JOIN sale s2 ON s1.book_id = s2.book_id
```

This will give us all the sales that have the same book_id as Alice's sales. But we are only interested in the sales to other customers, so we need to add a condition to exclude Alice's sales:

```sql
AND s2.customer_id != 1
```

Now we need to join the `customer` table to get the name of the other customer:

```sql
INNER JOIN customer c2 ON s2.customer_id = c2.id
```

Finally, we need to join the `book` table to get the title of the book:

```sql
INNER JOIN book b ON s1.book_id = b.id
```

Finally, we order the results by customer name and book title for easy reading:

```sql
ORDER BY c2.name, b.title;
```

This query efficiently finds all customers who share at least one book purchase with Alice, showing which books they have in common and when they made their purchase.
