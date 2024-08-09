# Views

SQL views are virtual tables that do not store data directly. They are essentially a saved SQL query and can pull data from multiple tables or just present the data from one table in a different way.

## Creating Views

You can create a view using the `CREATE VIEW` statement. In the following example, a new view named `CustomerView` is created which contains customer's ID, name, and address from the `Customers` table:

```sql
CREATE VIEW CustomerView AS
SELECT CustomerID, Name, Address
FROM Customers;
```

## Querying Views

After a view has been created, it can be used in the `FROM` clause of a `SELECT` statement, as if it's an actual table. For instance, to select all from `CustomerView`:

```sql
SELECT *
FROM CustomerView;
```

## Updating Views

The `CREATE OR REPLACE VIEW` statement is used to update a view. Consider the `CustomerView` we created earlier. If we want to include the customer's phone, we can update it as follows:

```sql
CREATE OR REPLACE VIEW CustomerView AS
SELECT CustomerID, Name, Address, Phone
FROM Customers;
```

## Dropping Views

To delete a view, use the `DROP VIEW` statement:

```sql
DROP VIEW CustomerView;
```

Keep in mind that not all database systems support the `CREATE OR REPLACE VIEW` statement. Also, the updatability of a view depends on whether it includes functions, expressions, or multiple tables. Some databases might not let you update a view at all.

## Restrictions

There are a few restrictions to bear in mind when working with views. SQL views can't:

- Contain a `ORDER BY` clause in the view definition
- Be indexed
- Have triggers or default values

Each database may have its own specific limitations and capabilities with using views, so always refer to the official documentation for more information.

Note: The above examples use a hypothetical `Customers` table. Replace this with your actual table name when trying these in your environment.