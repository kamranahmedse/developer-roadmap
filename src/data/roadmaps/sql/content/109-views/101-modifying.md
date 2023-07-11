# Modifying Views

In SQL, you can modify a VIEW in two ways:

- Using CREATE OR REPLACE VIEW: This command helps you modify a VIEW but keeps the VIEW name intact. This is beneficial when you want to change the definition of the VIEW but do not want to change the VIEW name.

- Using the DROP VIEW and then CREATE VIEW: In this method, you first remove the VIEW using the DROP VIEW command and then recreate the view using the new definition with the CREATE VIEW command.

## Modifying VIEW Using CREATE OR REPLACE VIEW

Syntax:

```sql
CREATE OR REPLACE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

Example:

```sql
CREATE OR REPLACE VIEW customer_view AS
SELECT customer_name, country
FROM customers
WHERE country='USA';
```
In this example, 'customer_view' will show the names and countries of customers only from the USA.

## Modifying VIEW Using DROP VIEW and CREATE VIEW

Syntax: 
Drop the VIEW:
```sql
DROP VIEW view_name;
```
Create a new VIEW:
```sql
CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

Example: 
Drop the VIEW
```sql
DROP VIEW customer_view;
```
Create a new VIEW:
```sql
CREATE VIEW customer_view AS
SELECT customer_name, country
FROM customers
WHERE country='UK';
```
In this example, we first removed 'customer_view'. Then, we created it again with the new definition where it now shows the names and countries of the customers only from the UK.

**CAUTION**: If other views, stored procedures, or programs depend on this view, they will be affected after you drop the view. For this reason, using CREATE OR REPLACE VIEW is generally safer. 

## Modifying Data through VIEW

In some cases, you can modify the data of the underlying tables via a VIEW. 

Syntax:

```sql
UPDATE view_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

Example:

```sql
UPDATE customer_view
SET country = 'USA'
WHERE customer_name = 'John Doe';
```
This command will update the country of 'John Doe' to 'USA' in both the VIEW and the underlying table.

However, not every VIEW is updatable. You can only modify the data if the VIEW you're modifying is a simple VIEW that returns results from a single table without any aggregation or complex clauses. If you attempt to modify a complex view (i.e., it includes JOIN, GROUP BY, HAVING, DISTINCT), you will get an error.