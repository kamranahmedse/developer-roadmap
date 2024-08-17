# Truncate Table

The `TRUNCATE TABLE` statement is a Data Definition Language (DDL) operation that is used to mark the extents of a table for deallocation (empty for reuse). The result of this operation quickly removes all data from a table, typically bypassing a number of integrity enforcing mechanisms intended to protect data (like triggers).

It effectively eliminates all records in a table, but not the table itself. Unlike the `DELETE` statement, `TRUNCATE TABLE` does not generate individual row delete statements, so the usual overhead for logging or locking does not apply.

## Syntax

In SQL, the `TRUNCATE TABLE` statement is quite simple:

```sql
TRUNCATE TABLE table_name;
```

In this command, "table_name" refers to the name of the table you wish to clear.

## Example

If you have a table named `Orders` and you want to delete all its records, you would use:

```sql
TRUNCATE TABLE Orders;
```

After executing this statement, the `Orders` table would still exist, but it would be empty.

Remember, while `TRUNCATE TABLE` is faster and uses fewer system and transaction log resources than `DELETE`, it does not invoke triggers and cannot be rolled back, so use with caution.

## Limitations

Truncate preserves the structure of the table for future use. But you can't truncate a table that:

- Is referenced by a FOREIGN KEY constraint. (You can truncate a table that has a foreign key that references itself.)
- Participates in an indexed view.
- Is published by using transactional replication or merge replication.

If you try to truncate a table with a foreign key constraint, SQL Server will prevent you from doing so and you will have to use the `DELETE` statement instead.

For partitioned tables, `TRUNCATE TABLE` removes all rows from all partitions. The operation is not allowed if the table contains any LOB columns - `varchar(max), nvarchar(max), varbinary(max), text, ntext, image, xml`, or if the table contains any filestream columns or spatial geo, geography, geometry, and hierarchyid data type columns, or any columns of CLR user-defined data types.