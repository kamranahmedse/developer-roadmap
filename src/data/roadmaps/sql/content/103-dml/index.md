# Data Manipulation Language (DML)

*DML* is a subcategory of `SQL` which stands for _Data Manipulation Language_. The purpose of DML is to insert, retrieve, update and delete data from the database. With this, we can perform operations on existing records.

DML contains four commands which are:

1. **INSERT INTO** - This command is used to insert new rows (records) into a table.

Example:

```sql
INSERT INTO table_name ( column1, column2, column3, ... )  
VALUES ( value1, value2, value3, ... )  
```

2. **SELECT** - This command is used to select data from a database. The data returned is stored in a result table, called the result-set.

Example:

```sql
SELECT column1, column2, ... 
FROM table_name
```

3. **UPDATE** - This command is used to modify the existing rows in a table.

Example:

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

4. **DELETE FROM** - This command is used to delete existing rows (records) from a table.

Example:

```sql
DELETE FROM table_name WHERE condition;
```