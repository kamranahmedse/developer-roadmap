# DELETE

The `DELETE` statement in SQL helps you remove existing records from a database. However, keep in mind, it is a destructive operation and may permanently erase data from your database.

With the `DELETE` statement, you can perform the following:

1. **Delete All Rows:**

    The `DELETE` statement without a `WHERE` clause deletes all rows in a table. This operation is irreversible.

    Example:
    ```sql
    DELETE FROM table_name;
    ```
    This SQL statement deletes all the records from `table_name`.

2. **Delete Specific Rows:**

    When combined with the `WHERE` clause, the `DELETE` SQL statement erases specific rows that meet the condition.

    Example:
    ```sql
    DELETE FROM table_name WHERE condition;
    ```
    This instance of the `DELETE` statement deletes records from `table_name` the place where the given `condition` matches.

It's crucial to use `DELETE` cautiously because it has the potential to either erase certain important rows or entirely empty the table.


*Note: The deletion made by the "DELETE" statement is permanent and cannot be undone. Always ensure to have a backup before running a DELETE query, especially when it is on a production database.*