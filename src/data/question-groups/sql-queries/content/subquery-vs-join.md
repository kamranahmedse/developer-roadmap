A subquery is a query that is inside another query. You use it for queries that require complex logic. You should use subqueries when you want to use the result of that subquery for another query. In the example below, the subquery is in brackets.

![Subquery](https://assets.roadmap.sh/guest/sql-subquery-ro4d0.png)

```sql
SELECT firstName,
  (SELECT COUNT(*)
  FROM cities
  WHERE cities.id = users.city_id) AS cityCount
FROM users;
```

On the other hand, a **JOIN** combines two or more tables based on related columns between them. The related column is usually a foreign key. You should use **JOINS** when you want to pull related data from different tables together. The code below illustrates how to use a **JOIN**.

```sql
SELECT firstName, COUNT(*) FROM users
JOIN cities ON users.city_id = cities.id
```

A JOIN is faster than a subquery in the following scenarios:

- When you are querying data from multiple tables.
- When you are filtering or joining on index columns. 