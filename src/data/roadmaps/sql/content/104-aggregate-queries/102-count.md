# COUNT

`COUNT` is a SQL function that returns the number of rows that match a specified criteria. Essentially, `COUNT` function is used when you need to know the count of a record in a certain table's column.

There are two types of count function; `COUNT(*)` and `COUNT(column)`.

- `COUNT(*)` counts all the rows in the target table whether columns contain null values or not.

```sql
SELECT COUNT(*) FROM table_name;
```

- `COUNT(column)` counts the rows in the column of a table excluding null. 

```sql
SELECT COUNT(column_name) FROM table_name;
```

You may also use `COUNT()` in conjunction with `GROUP BY` to return the count of rows within each group.

A typical example would be:

```sql
SELECT column_name, COUNT(*) FROM table_name GROUP BY column_name;
```

Here, `column_name` is the name of the column based on which the rows will be grouped. This query will return the count of rows in each group of `column_name`.

By understanding how to use the `COUNT()` function, you can extract more meaningful data from your tables, and perform analytics and generate reports based on the counts of certain attributes in your database.
