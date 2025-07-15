JOINs let you combine rows from two or more tables based on a related column. These are the most common types:

- `INNER JOIN`: Returns only rows that match in both tables.
- `LEFT JOIN`: Returns all rows from the left table and matching rows from the right.
- `RIGHT JOIN`: Returns all rows from the right table and matching rows from the left.
- `FULL JOIN`: Returns all rows when there's a match in either table.

Example using `LEFT JOIN`:

```sql
-- Get users and their orders (even if they have none)  
SELECT users.name, orders.amount  
FROM users  
LEFT JOIN orders ON users.id = orders.user_id;
```

Think of JOIN operations like combining spreadsheets based on related information. 