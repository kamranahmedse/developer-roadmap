---
title: Filtering with WHERE
description: Learn the basics of SQL, the language for querying databases.
order: 130
type: lesson-challenge
---

We can use the optional `WHERE` clause in our SQL queries to filter and only select the rows that match a certain condition.

For example, let's say we have a table called `customers` that contains the information about the customers of our online bookstore.

| id | name | registered_at | is_active | country |
|----|-------------|------------|-----------|---------|
| 1  | John Doe | 2024-01-01 | true | USA |
| 2  | Jane Smith | 2024-01-02 | true | Canada |
| 3  | Alice Johnson | 2024-01-03 | false | USA |
| 4  | Bob Smith | 2024-01-04 | true | Canada |
| 5  | Charlie Davis | 2024-01-05 | false | USA |

We want to select the customers that are active i.e. `is_active` column is `true`. The SQL query to do this would be:

```sql
SELECT * 
FROM customers 
WHERE is_active = true;
```

When executed, our database engine will scan the `customers` table, going through each row and checking if the `is_active` column of the given row is `true`. If it is, the row is included in the result set. If it is not, the row is skipped. Output from the query above would be:

| id | name | registered_at | is_active | country |
|----|-------------|------------|-----------|---------|
| 1  | John Doe | 2024-01-01 | true | USA |
| 2  | Jane Smith | 2024-01-02 | true | Canada |
| 4  | Bob Smith | 2024-01-04 | true | Canada |

---

## Combining Conditions

We can combine multiple conditions using the `AND` and `OR` operators. Let's say we want to select the customers that are active and from Canada. The SQL query to do this would be:

```sql
SELECT * 
FROM customers 
WHERE is_active = true AND country = 'Canada';
```

The output from the query above would be:

| id | name | registered_at | is_active | country |
|----|-------------|------------|-----------|---------|
| 2  | Jane Smith | 2024-01-02 | true | Canada |
| 4  | Bob Smith | 2024-01-04 | true | Canada |

As you can see, the customer `John Doe` is not included in the results because even though the customer is active, they are not from `Canada`.

---

## Comparison Operators

We can use comparison operators to filter the rows that match a certain condition. Here is a subset of comparison operators that are most commonly used:

| Operator | Description |
|----------|-------------|
| = | Equal |
| != | Not equal |
| > | Greater than |
| < | Less than |
| >= | Greater than or equal to |
| <= | Less than or equal to |
| BETWEEN | Between a range of values |
| IN | In a list of values |
| LIKE | Matches a pattern |
| NOT | Negates a condition |

Let's say we have another table called `orders` that contains the information about the orders of our online bookstore.

| id | customer_id | order_date | total_amount |
|----|-------------|------------|--------------|
| 1  | 1 | 2024-01-01 | 100.00 |
| 2  | 2 | 2024-01-02 | 150.00 |
| 3  | 3 | 2024-01-03 | 200.00 |
| 4  | 4 | 2024-01-04 | 250.00 |
| 5  | 5 | 2024-01-05 | 300.00 |

Given below are some questions and answers to help you practice filtering with WHERE clause.

> Coding environment on the right has the `customers` and `orders` tables pre-loaded with data so go ahead and try writing the SQL queries to answer the questions.

---

#### Select all orders with total amount greater than 200

```sql
SELECT * 
FROM orders 
WHERE total_amount > 200;
```

---

#### Select all orders with total amount between 100 and 200

```sql
SELECT * 
FROM orders 
WHERE total_amount BETWEEN 100 AND 200;
```

We can also use the `AND` operator to achieve the same result.

```sql
SELECT * 
FROM orders 
WHERE total_amount >= 100 AND total_amount <= 200;
```

---

#### Select all the orders where customer id is 1, 2 or 3

You can use the `IN` operator which has the following syntax:

```sql
SELECT * 
FROM table_name 
WHERE column_name IN (value1, value2, value3);
```

Since we want to select all the orders where the `customer_id` is either `1`, `2` or `3`, the SQL query to do this would be:

```sql
SELECT * 
FROM orders 
WHERE customer_id IN (1, 2, 3);
```

We can also use the `OR` operator to achieve the same result.

```sql
SELECT * 
FROM orders 
WHERE 
    customer_id = 1 OR 
    customer_id = 2 OR 
    customer_id = 3;
```

---

#### Select all customers whose last name is Smith

We can use the `LIKE` operator to filter based on a pattern. The syntax for the `LIKE` operator is:

```sql
SELECT * 
FROM table_name 
WHERE column_name LIKE '%pattern%';
```

`%` is the wildcard character and matches any sequence of characters. The table below is the description of what the given pattern matches.

| Pattern | Description |
|---------|-------------|
| `%Smith` | Any string that ends with `Smith` |
| `Smith%` | Any string that starts with `Smith` |
| `%Smith%` | Any string that contains `Smith` anywhere in the string |

In our case, we want to select all customers whose last name is `Smith`. The SQL query to do this would be:

```sql
SELECT * 
FROM customers 
WHERE name LIKE '%Smith';
```

To select all customers whose name starts with `S`, the SQL query would be:

```sql
SELECT * 
FROM customers 
WHERE name LIKE 'S%';
```

---

#### Negating a condition

We can negate a condition using the `NOT` operator. For example, to select all orders where the customer id is not 1 or 3, the SQL query would be:

```sql
SELECT * 
FROM orders 
WHERE customer_id NOT IN (1, 3);
```

To select all customers whose name does not start with `S`, the SQL query would be:

```sql
SELECT * 
FROM customers 
WHERE name NOT LIKE 'S%';
```

To select all the orders where amount is not between 100 and 200, the SQL query would be:

```sql
SELECT * 
FROM orders 
WHERE total_amount NOT BETWEEN 100 AND 200;
```

To select all customers whose name does not contain the letter `i` in their name, the SQL query would be:

```sql
SELECT * 
FROM customers 
WHERE name NOT LIKE '%i%';
```

#### Select customers with name starting with 'A' and ending with 'n'

```sql
SELECT * 
FROM customers 
WHERE name LIKE 'A%n';
```

---

### Operator Precedence

Considering the same `orders` table, let's say we want to select all orders with total amount greater than 200 and customer id is 1 or 3. We can write the query as:

```sql
SELECT * 
FROM orders 
WHERE total_amount > 200 AND customer_id IN (1, 3);
```

We can also write the same query without using the `IN` operator:

```sql
SELECT * 
FROM orders 
WHERE 
    total_amount > 200 AND 
    (customer_id = 1 OR customer_id = 3);
```

If you look closely, you will see that we have used parentheses to group the conditions. This is because of the operator precedence: `AND` has higher precedence than `OR`. If we don't use parentheses, the query will be evaluated as:

```sql
SELECT * 
FROM orders 
WHERE 
    (total_amount > 200 AND customer_id = 1) 
    OR customer_id = 3;
```

Which is not the same as the query we wrote earlier.

#### What is operator precedence?

Operator precedence specifies the order in which conditional operators are evaluated when two or more operators with different precedence are adjacent in an expression. 

To understand precedence, let's take an example for a mathematical expression.

```
1 + 2 * 3
```

Since multiplication `*` has higher precedence than addition `+`, the expression is evaluated as 

```
1 + (2 * 3) = 1 + 6 = 7
``` 

If we want to force the addition to be evaluated first, we can use parentheses:

```
(1 + 2) * 3 = 3 * 3 = 9
```

Similarly, in SQL different operators have different precedence. Thus, if you want to ensure that a certain condition is evaluated first, you should use parentheses to group the conditions.