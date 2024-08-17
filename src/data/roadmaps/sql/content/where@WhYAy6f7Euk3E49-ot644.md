# WHERE

SQL provides a WHERE clause that is basically used to filter the records. If the condition specified in the WHERE clause satisfies, then only it returns the specific value from the table. You should use the WHERE clause to filter the records and fetching only the necessary records.

The WHERE clause is not only used in SELECT statement, but it is also used in UPDATE, DELETE statement, etc., which we will learn in subsequent chapters.

An example of its implementation is:

```sql
SELECT * FROM Students WHERE Age>10;
```

In this example, the statement selects all fields from the 'Students' table where the 'Age' field value is greater than 10.

WHERE clause can be combined with AND, OR, and NOT operators. Here's an example:

```sql
SELECT * FROM Students WHERE Age > 10 AND Gender = 'Female';
```

In this example, the statement selects all fields from 'Students' table where the 'Age' field value is greater than 10 and the 'Gender' is Female.

The syntax generally looks like this:

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```