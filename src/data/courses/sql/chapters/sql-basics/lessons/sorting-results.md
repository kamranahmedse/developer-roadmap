---
title: Sorting with ORDER BY
description: Learn how to sort the results of a query.
order: 140
type: lesson-challenge
---

We can use the `ORDER BY` clause to sort the results of a query. Taking the example of the `orders` table from the previous lesson:

| id  | customer_id | total_amount | order_date |
| --- | ----------- | ------------ | ---------- |
| 1   | 1           | 100          | 2024-01-01 |
| 2   | 2           | 200          | 2024-01-02 |
| 3   | 3           | 150          | 2024-01-03 |
| 4   | 4           | 300          | 2024-01-04 |
| 5   | 5           | 250          | 2024-01-05 |

If we want to get all the orders sorted by the `total_amount` column in descending order i.e. the highest total amount first, we can use the following SQL query:

```sql
SELECT *
FROM orders
ORDER BY total_amount DESC;
```

The output of this query would be:

| id  | customer_id | total_amount | order_date |
| --- | ----------- | ------------ | ---------- |
| 4   | 4           | 300          | 2024-01-04 |
| 5   | 5           | 250          | 2024-01-05 |
| 3   | 3           | 150          | 2024-01-03 |
| 2   | 2           | 200          | 2024-01-02 |
| 1   | 1           | 100          | 2024-01-01 |

Similarly, to get the orders sorted in ascending order by the `total_amount` column, we can use the following SQL query:

```sql
SELECT *
FROM orders
ORDER BY total_amount ASC;
```

## Sorting by Multiple Columns

We can also sort the results by multiple columns. This is useful when we want to sort the results by one column and then sort them by another column if the first column values are identical.

For example, let's say we have a table called `books` that contains information about books in our store:

| id  | title                  | author              | price | stock |
| --- | ---------------------- | ------------------- | ----- | ----- |
| 1   | The Great Gatsby       | F. Scott Fitzgerald | 15.99 | 5     |
| 2   | To Kill a Mockingbird  | Harper Lee          | 15.99 | 8     |
| 3   | 1984                   | George Orwell       | 12.99 | 3     |
| 4   | Pride and Prejudice    | Jane Austen         | 15.99 | 2     |
| 5   | The Catcher in the Rye | J.D. Salinger       | 12.99 | 6     |

To sort the books first by price (highest first) and then by stock quantity (lowest first) for books with the same price, we can use the following SQL query:

```sql
SELECT *
FROM books
ORDER BY price DESC, stock ASC;
```

The output of this query would be:

| id  | title                  | author              | price | stock |
| --- | ---------------------- | ------------------- | ----- | ----- |
| 4   | Pride and Prejudice    | Jane Austen         | 15.99 | 2     |
| 1   | The Great Gatsby       | F. Scott Fitzgerald | 15.99 | 5     |
| 2   | To Kill a Mockingbird  | Harper Lee          | 15.99 | 8     |
| 3   | 1984                   | George Orwell       | 12.99 | 3     |
| 5   | The Catcher in the Rye | J.D. Salinger       | 12.99 | 6     |

Notice the highest-priced books at the top; books with IDs `1`, `2`, and `4` have the same price, but the book with ID `4` has less stock than the books with IDs `1` and `2`, so it comes first.

If we want to sort the books first by price (highest first) and then by stock quantity (highest first) for books with the same price, we can use the following SQL query:

```sql
SELECT *
FROM books
ORDER BY price DESC, stock DESC;
```

The output of this query would be:

| id  | title                  | author              | price | stock |
| --- | ---------------------- | ------------------- | ----- | ----- |
| 2   | To Kill a Mockingbird  | Harper Lee          | 15.99 | 8     |
| 1   | The Great Gatsby       | F. Scott Fitzgerald | 15.99 | 5     |
| 4   | Pride and Prejudice    | Jane Austen         | 15.99 | 2     |
| 5   | The Catcher in the Rye | J.D. Salinger       | 12.99 | 6     |
| 3   | 1984                   | George Orwell       | 12.99 | 3     |
