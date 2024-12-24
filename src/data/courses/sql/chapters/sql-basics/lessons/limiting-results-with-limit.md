---
title: Limiting Results with LIMIT
description: Learn how to limit the results of a query.
order: 160
type: lesson-challenge
---

Real-world data is often large and complex, and it's not always practical to return all the data in a single query. SQL offers a way to limit the number of rows returned by a query using `LIMIT` clause.

For example, given the following `orders` table:

| id | customer_id | order_date | total |
|----|-------------|------------|-------|
| 1  | 101         | 2024-01-01 | 100   |
| 2  | 102         | 2024-01-02 | 200   |
| 3  | 103         | 2024-01-03 | 300   |
| 4  | 104         | 2024-01-04 | 400   |
| 5  | 105         | 2024-01-05 | 500   |

If we want to get the first 2 rows from the `orders` table, we can use the following SQL query:

```sql
SELECT *
FROM orders
LIMIT 2;
```

The output of this query will be:

| id | customer_id | order_date | total |
|----|-------------|------------|-------|
| 1  | 101         | 2024-01-01 | 100   |
| 2  | 102         | 2024-01-02 | 200   |

## Limiting with Filter and Order

If you use `LIMIT` in a `SELECT` statement with a `WHERE` clause and an `ORDER BY` clause, the `LIMIT` clause is executed after the `WHERE` clause and the `ORDER BY` clause.


### Any 2 orders with order amount > 200

For example, if we want to get the 2 orders with the order amount greater than 200, we can use the following SQL query:

```sql
SELECT *
FROM orders
WHERE total > 200
LIMIT 2;
```

Since we don't have sorting applied, the output may contain **any 2 orders** with the order amount greater than 200.

| id | customer_id | order_date | total |
|----|-------------|------------|-------|
| 3  | 103         | 2024-01-03 | 300   |
| 4  | 104         | 2024-01-04 | 400   |

### 2 most expensive orders with order amount > 200

If we want to get the 2 most expensive orders with the order amount greater than 200, we can use the following SQL query:

```sql
SELECT *
FROM orders
WHERE total > 200
ORDER BY total DESC
LIMIT 2;
```

The output of this query will be:

| id | customer_id | order_date | total |
|----|-------------|------------|-------|
| 5  | 105         | 2024-01-05 | 500   |
| 4  | 104         | 2024-01-04 | 400   |

As you can see, the output contains the **2 most expensive orders** with the order amount greater than 200.  This tells us that the `LIMIT` clause is executed in the following order:

1. `WHERE` clause - filters the orders with the order amount greater than 200
2. `ORDER BY` clause - sorts the orders by the order amount in descending order
3. `LIMIT` clause - limits the number of rows returned to 2

## Excluding rows with OFFSET

If you want to exclude a certain number of rows from the result, you can use the `OFFSET` clause. `OFFSET x` is used to skip the first `x` rows from the result set and it **must be used in conjunction with the `LIMIT` clause**.

For example, if we want to get the 2 most expensive orders with the order amount greater than 200, our query will be:

```sql
SELECT *
FROM orders
WHERE total > 200
ORDER BY total DESC
LIMIT 2 
OFFSET 1;
```

The output of this query will be:

| id | customer_id | order_date | total |
|----|-------------|------------|-------|
| 4  | 104         | 2024-01-04 | 400   |
| 3  | 103         | 2024-01-03 | 300   |

As you can see, because of `OFFSET 1`, it did not return the most expensive order (i.e., the order with a total of 500) and instead returned the second and third most expensive orders (i.e., the order with a total of 400 and 300). This tells us that the `OFFSET` clause is executed after the `WHERE` clause and the `ORDER BY` clause.

---

## Challenge

Given the following `orders` table, write a query to get the cheapest 1 order.

| id | customer_id | order_date | total |
|----|-------------|------------|-------|
| 2  | 102         | 2024-01-02 | 200   |
| 3  | 103         | 2024-01-03 | 300   |
| 1  | 101         | 2024-01-01 | 100   |
| 4  | 104         | 2024-01-04 | 400   |
| 5  | 105         | 2024-01-05 | 500   |

Your query should return the following result:

| id | customer_id | order_date | total |
|----|-------------|------------|-------|
| 1  | 101         | 2024-01-01 | 100   |
