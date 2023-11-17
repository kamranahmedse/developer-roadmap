# JOINs

SQL Joins are used to retrieve data from two or more data tables, based on a related column between them. The key types of JOINs include:

1. INNER JOIN: This type of join returns records with matching values in both tables.

```sql
SELECT table1.column1, table2.column2...
FROM table1
INNER JOIN table2
ON table1.matching_column = table2.matching_column;
```
2. LEFT (OUTER) JOIN: Returns all records from the left table, and matched records from the right table.

```sql
SELECT table1.column1, table2.column2...
FROM table1
LEFT JOIN table2
ON table1.matching_column = table2.matching_column;
```
3. RIGHT (OUTER) JOIN: Returns all records from the right table, and matched records from the left table.

```sql
SELECT table1.column1, table2.column2...
FROM table1
RIGHT JOIN table2
ON table1.matching_column = table2.matching_column;
```
4. FULL (OUTER) JOIN: Returns all records when either a match is found in either left (table1) or right (table2) table records.

```sql
SELECT table1.column1, table2.column2...
FROM table1
FULL JOIN table2
ON table1.matching_column = table2.matching_column;
```
5. SELF JOIN: A self join is a join in which a table is joined with itself.

```sql
SELECT a.column_name, b.column_name...
FROM table_name AS a, table_name AS b
WHERE condition;
```
6. CARTESIAN JOIN: If WHERE clause is omitted, the join operation produces a Cartesian product of the tables involved in the join. The size of a Cartesian product result set is the number of rows in the first table multiplied by the number of rows in the second table.

```sql
SELECT table1.column1, table2.column2...
FROM table1, table2;
```
Each type of JOIN allows for the retrieval of data in different situations, making them flexible and versatile for different SQL queries.