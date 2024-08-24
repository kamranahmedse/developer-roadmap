# DELETE

The `DELETE` statement is used to remove existing rows from a table based on a specified condition.
It can be executed via a query like so:

```
DELETE FROM table_name WHERE condition;
```
- _keep in mind that **FROM** and **WHERE** are also commands to target rows from a table(FROM) only if the condition is met(WHERE)_
  
⚠️ &nbsp; Omitting the `WHERE` clause will **delete all rows** in the table, and this action is irreversible.
