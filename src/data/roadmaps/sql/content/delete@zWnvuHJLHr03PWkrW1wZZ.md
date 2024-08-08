# DELETE

The DELETE statement is used to delete existing records in a table. This is a straightforward process, but care must be taken because the DELETE statement is destructive and cannot be undone by default.

## Syntax

The basic syntax of a DELETE query with WHERE clause in SQL is as follows:
```sql
DELETE FROM table_name [WHERE condition]
```

- `table_name`: Specifies the table where you want to delete data.
- `WHERE condition`: It is optional. You can use the WHERE clause with a DELETE query to delete the selected rows, otherwise all the records would be deleted.

## Examples

1. **DELETE ALL Rows**

Deletes all rows from a table named 'students'.
```sql
DELETE FROM students;
```

2. **DELETE Specified Rows**

Deletes the student whose student_id is '1001' from the 'students' table.
```sql
DELETE FROM students WHERE student_id = '1001';
```

**Caution:** Be very careful when using the DELETE statement. If you omit the WHERE clause, all records will be deleted!

## Multi-table deletions

Some database systems allow for deleting from multiple tables in a single DELETE statement. This is database-specific and beyond the scope of the basic SQL DELETE command.

Remember, always make sure to have a backup and confirm you're deleting the correct data before running a DELETE command, especially in production environments.