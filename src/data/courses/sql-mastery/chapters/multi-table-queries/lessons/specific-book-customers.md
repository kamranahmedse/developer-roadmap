---
title: Specific Book Customers
description: Practice using joins to find customers who have bought a specific book
order: 140
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
      (1, 'John Doe', 'john.doe@example.com'),
      (2, 'Jane Smith', 'jane.smith@example.com'),
      (3, 'Alice Johnson', 'alice.johnson@example.com'),
      (4, 'Bob Brown', 'bob.brown@example.com'),
      (5, 'Charlie Davis', 'charlie.davis@example.com'),
      (6, 'David Lee', 'david.lee@example.com');

  INSERT INTO sale (id, customer_id, book_id, order_date, total_amount)
  VALUES 
      (1, 1, 1, '2024-12-02', 100.00),
      (2, 1, 2, '2024-11-15', 150.00),
      (3, 1, 3, '2024-10-20', 200.00),
      (4, 4, 4, '2024-12-26', 250.00),
      (5, 5, 5, '2024-11-12', 300.00),
      (6, 2, 1, '2024-11-23', 300.00),
      (7, 2, 2, '2024-11-11', 300.00);
  ```
---

We have following three tables `customer`, `sale`, and `book`. You are required to write a query to find all customers who have purchased any book by "Harper Lee".

> `customer` table has the list of customers.

| id  | name          | email                     |
| --- | ------------- | ------------------------- |
| 1   | John Doe      | john.doe@example.com      |
| 2   | Jane Smith    | jane.smith@example.com    |
| 3   | Alice Johnson | alice.johnson@example.com |
| 4   | Bob Brown     | bob.brown@example.com     |
| 5   | Charlie Davis | charlie.davis@example.com |
| 6   | David Lee     | david.lee@example.com     |

> `sale` table has the list of sales made to customers.

| id  | customer_id | order_date | total_amount |
| --- | ----------- | ---------- | ------------ |
| 1   | 1           | 2024-12-02 | 100.00       |
| 2   | 1           | 2024-11-15 | 150.00       |
| 3   | 1           | 2024-10-20 | 200.00       |
| 4   | 4           | 2024-12-26 | 250.00       |
| 5   | 5           | 2024-11-12 | 300.00       |
| 6   | 2           | 2024-11-23 | 300.00       |
| 7   | 2           | 2024-11-11 | 300.00       |

> `book` table has the list of books.

| id  | title                  | author              |
| --- | ---------------------- | ------------------- |
| 1   | The Great Gatsby       | F. Scott Fitzgerald |
| 2   | To Kill a Mockingbird  | Harper Lee          |
| 3   | 1984                   | George Orwell       |
| 4   | Pride and Prejudice    | Jane Austen         |
| 5   | The Catcher in the Rye | J.D. Salinger       |

## Expected Output

The expected output should be a list of customers who have purchased any book by "Harper Lee" with their id, name, title of the book they purchased and the date of the purchase.

| id  | name       | title                 | purchase_date     |
| --- | ---------- | --------------------- | ----------------- |
| 1   | John Doe   | To Kill a Mockingbird | November 15, 2024 |
| 2   | Jane Smith | To Kill a Mockingbird | November 11, 2024 |

## Solution

```sql
SELECT
    c.id,
    c.name,
    c.email,
    b.title,
    TO_CHAR(s.order_date, 'Month, DD, YYYY') purchase_date
FROM
    customer c
INNER JOIN
    sale s on c.id = s.customer_id
INNER JOIN
    book b ON s.book_id = b.id
WHERE
    b.author = 'Harper Lee'
```
