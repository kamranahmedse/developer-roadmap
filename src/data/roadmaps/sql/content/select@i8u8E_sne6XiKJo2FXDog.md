# SELECT

The `SELECT` statement in SQL is majorly used for fetching data from the database. It is one of the most essential elements of SQL.

## Syntax

Here's how your `SELECT` command will look like:

```sql
SELECT column1, column2, ...
FROM table_name;
```
If you want to select all the columns of a table, you can use `*` like this: 
```sql
SELECT * FROM table_name;
```
## Example 

For instance, consider we have a table `EMPLOYEES` with columns `name`, `designation`, and `salary`. We can use `SELECT` in the following way:

```sql
SELECT name, designation FROM EMPLOYEES;
```
This will retrieve all the names and designations of all employees from the table `EMPLOYEES`.

## SELECT DISTINCT

The `SELECT DISTINCT` statement is used to return only distinct (different) values. The DISTINCT keyword eliminates duplicate records from the results.

Here's how you can use it:

```sql
SELECT DISTINCT column1, column2, ...
FROM table_name;
```

For example, if we want to select all unique designations from the `EMPLOYEES` table, the query will look like this:

```sql
SELECT DISTINCT designation FROM EMPLOYEES;
```

## SELECT WHERE 

`SELECT` statement combined with `WHERE` gives us the ability to filter records based on a condition. 

Syntax: 

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```
For example, to select employees with salary more than 50000, you can use this query:

```sql
SELECT * FROM EMPLOYEES WHERE salary > 50000;
```

## SELECT ORDER BY 

Using `SELECT` statement in conjunction with `ORDER BY`, we can sort the result-set in ascending or descending order.

Syntax: 

```sql
SELECT column1, column2, ...
FROM table_name
ORDER BY column ASC|DESC;
```
For example, to select all employees and order them by their name in ascending fashion:

```sql
SELECT * FROM EMPLOYEES ORDER BY name ASC;
```

Remember that the default sort order is ascending if the ASC|DESC parameter is not defined.
