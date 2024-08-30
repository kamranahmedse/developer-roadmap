# INSERT

The `INSERT` statement is used to add new rows of data into a table. <br/>
It can be utilized in a query as seen in the example below:
```sql
INSERT INTO table (column1, column2...)
VALUES (value1, value2...);
```

If -for whatever reason- all columns of a table require data insertion, <br/> it can be done so by ommiting the `column` assignment in the query:
```sql
INSERT INTO table_name VALUES (value1, value2, value3, ...);
```

Visit the following resources to learn more:

- [@article@SQL INSERT](https://www.w3schools.com/sql/sql_insert.asp)
