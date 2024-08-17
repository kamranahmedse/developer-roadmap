# Sub Queries

In SQL, a subquery is a query embedded within another SQL query. You can alternately call it a nested or an inner query. The containing query is often referred to as the outer query. Subqueries are utilized to retrieve data that will be used in the main query as a condition to further restrict the data to be retrieved.

Subqueries can be used in various parts of a query, including:

- **SELECT** statement
- **FROM** clause
- **WHERE** clause
- **GROUP BY** clause
- **HAVING** clause

## Syntax

In general, the syntax can be written as:

```sql
SELECT column_name [, column_name]
FROM   table1 [, table2 ]
WHERE  column_name OPERATOR
   (SELECT column_name [, column_name]
   FROM table1 [, table2 ]
   [WHERE])
```

## Types of Subqueries

1. **Scalar Subquery**: It returns single value. 

   ```sql
   SELECT name 
   FROM student 
   WHERE roll_id = (SELECT roll_id FROM student WHERE name='John');
   ```

2. **Row subquery**: It returns a single row or multiple rows of two or more values. 

   ```sql
   SELECT * FROM student 
   WHERE (roll_id, age)=(SELECT MIN(roll_id),MIN(age) FROM student);
   ```

3. **Column subquery**: It returns single column value with multiple rows and one column. 

   ```sql
   SELECT name, age FROM student 
   WHERE name in (SELECT name FROM student);
   ```

4. **Table subquery**: It returns more than one row and more than one column.

   ```sql
   SELECT name, age 
   FROM student 
   WHERE (name, age) IN (SELECT name, age FROM student);
   ```

## General Note

Subqueries can be either correlated or uncorrelated. A correlated subquery is a subquery that uses values from the outer query. Conversely, an uncorrelated subquery is a subquery that can be run independently of the outer query.
