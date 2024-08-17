# SQL keywords

SQL employs a number of standard command keywords that are integral to interact with databases. Keywords in SQL provide
instructions as to what action should be performed.

Here are some of the primary SQL keywords:

**SELECT**: This keyword retrieves data from a database. For example,

```sql
SELECT * FROM Customers;
```

In the above statement `*` indicates that all records should be retrieved from the `Customers` table.

**FROM**: Used in conjunction with `SELECT` to specify the table from which to fetch data.

**WHERE**: Used to filter records. Incorporating a WHERE clause, you might specify conditions that must be met. For
   example,

```sql
SELECT * FROM Customers WHERE Country='Germany';
```

**INSERT INTO**: This command is used to insert new data into a database.

```sql
INSERT INTO Customers (CustomerID, CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('Cardinal','Tom B. Erichsen','Skagen 21','Stavanger','4006','Norway');
```

**UPDATE**: This keyword updates existing data within a table. For example,

```sql
UPDATE Customers SET ContactName='Alfred Schmidt', City='Frankfurt' WHERE CustomerID=1;
```

**DELETE**: This command removes one or more records from a table. For example,

```sql
DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';
```

**CREATE DATABASE**: As implied by its name, this keyword creates a new database.

```sql
CREATE DATABASE mydatabase;
```

**ALTER DATABASE**, **DROP DATABASE**, **CREATE TABLE**, **ALTER TABLE**, **DROP TABLE**: These keywords are used to
   modify databases and tables.

Remember that SQL is not case sensitive, meaning keywords can be written in lower case. The convention is to write them
in ALL CAPS for readability. There are many more keywords in SQL, but these are some of the most common.

Learn more about SQL from the following resources:

- [@article@SQL Tutorial - Mode](https://mode.com/sql-tutorial/)
- [@article@SQL Tutorial](https://www.sqltutorial.org/)
- [@article@SQL Tutorial - W3Schools](https://www.w3schools.com/sql/default.asp)
