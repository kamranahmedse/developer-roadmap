# Joining Tables

## Joining Tables

Joining tables is a fundamental concept in SQL databases, as it allows you to combine data from two or more tables based on a related column. In PostgreSQL, there are several types of joins that can be used to retrieve data from multiple tables, such as Inner Join, Left Join, Right Join, Full Outer Join, and Cross Join.

### Inner Join

An inner join returns rows from both tables that satisfy the given condition. It combines the columns of both tables where the specified condition is met. The syntax for inner join is:

```sql
SELECT columns
FROM table1
JOIN table2
ON table1.column = table2.column;
```

### Left Join (Left Outer Join)

A left join returns all rows from the left table (table1) and the matched rows from the right table (table2). If no match is found, NULL values are returned for the right table's columns. The syntax for left join is:

```sql
SELECT columns
FROM table1
LEFT JOIN table2
ON table1.column = table2.column;
```

### Right Join (Right Outer Join)

A right join returns all rows from the right table (table2) and the matched rows from the left table (table1). If no match is found, NULL values are returned for the left table's columns. The syntax for right join is:

```sql
SELECT columns
FROM table1
RIGHT JOIN table2
ON table1.column = table2.column;
```

### Full Outer Join

A full outer join returns all rows from both tables, with NULL values in columns where there's no match between the rows. The syntax for full outer join is:

```sql
SELECT columns
FROM table1
FULL OUTER JOIN table2
ON table1.column = table2.column;
```

### Cross Join

A cross join returns the Cartesian product of both tables, which means it combines each row from the first table with every row of the second table. This type of join doesn't require a condition as it returns all possible combinations. The syntax for cross join is:

```sql
SELECT columns
FROM table1
CROSS JOIN table2;
```

In conclusion, joining tables is an essential technique to combine data from different tables based on common columns. With various types of joins available in PostgreSQL, you can utilize them to get the desired information efficiently.