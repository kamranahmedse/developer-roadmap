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

The bookstore is planning a special author event featuring "Harper Lee". To make the event a success, they want to invite customers who have previously purchased her books, believing these readers would be most interested in attending. Your task is to help identify these customers from the database.

Given the following data in table `customer`

| id  | name          | email                     |
| --- | ------------- | ------------------------- |
| 1   | John Doe      | john.doe@example.com      |
| 2   | Jane Smith    | jane.smith@example.com    |
| 3   | Alice Johnson | alice.johnson@example.com |
| 4   | Bob Brown     | bob.brown@example.com     |
| 5   | Charlie Davis | charlie.davis@example.com |
| 6   | David Lee     | david.lee@example.com     |

And the following data in table `sale`

| id  | customer_id | book_id | order_date | total_amount |
| --- | ----------- | ------- | ---------- | ------------ |
| 1   | 1           | 1       | 2024-12-02 | 100.00       |
| 2   | 1           | 2       | 2024-11-15 | 150.00       |
| 3   | 1           | 3       | 2024-10-20 | 200.00       |
| 4   | 4           | 4       | 2024-12-26 | 250.00       |
| 5   | 5           | 5       | 2024-11-12 | 300.00       |
| 6   | 2           | 1       | 2024-11-23 | 300.00       |
| 7   | 2           | 2       | 2024-11-11 | 300.00       |

And the following data in table `book`

| id  | title                  | author              |
| --- | ---------------------- | ------------------- |
| 1   | The Great Gatsby       | F. Scott Fitzgerald |
| 2   | To Kill a Mockingbird  | Harper Lee          |
| 3   | 1984                   | George Orwell       |
| 4   | Pride and Prejudice    | Jane Austen         |
| 5   | The Catcher in the Rye | J.D. Salinger       |

Write a query to identify all customers who have purchased books by Harper Lee. The events team wants to see:

- The customer's ID
- The customer's name
- Which Harper Lee book they purchased
- When they made the purchase (formatted as "Month DD, YYYY")

## Expected Output

| id  | name       | title                 | purchase_date     |
| --- | ---------- | --------------------- | ----------------- |
| 1   | John Doe   | To Kill a Mockingbird | November 15, 2024 |
| 2   | Jane Smith | To Kill a Mockingbird | November 11, 2024 |

## Solution

```sql
SELECT
    c.id,
    c.name,
    b.title,
    TO_CHAR(s.order_date, 'Month DD, YYYY') AS purchase_date
FROM customer c
INNER JOIN sale s
    ON c.id = s.customer_id
INNER JOIN book b
    ON s.book_id = b.id
WHERE b.author = 'Harper Lee'
ORDER BY s.order_date DESC;
```

### Explanation

Let's break down how this query works:

We start by joining all three tables to connect customers with their purchases and the books they bought:

```sql
FROM customer c
INNER JOIN sale s
    ON c.id = s.customer_id
INNER JOIN book b
    ON s.book_id = b.id
```

We filter for only Harper Lee's books:

```sql
WHERE b.author = 'Harper Lee'
```

We format the date to be more readable:

```sql
TO_CHAR(s.order_date, 'Month DD, YYYY') AS purchase_date
```

Finally, we order by purchase date to see the most recent purchases first:

```sql
ORDER BY s.order_date DESC
```

This query helps the events team identify customers who have shown interest in Harper Lee's work, allowing them to create a targeted invitation list for the author event.
