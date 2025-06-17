This is a concept that often confuses people, but comes up a lot in interviews. Indexes help your database find data faster (similar to an index in a book).

- **Clustered index**: Determines the physical order of rows in a table, and only one clustered index can exist per table. It's like having the book's pages arranged by one specific topic.
- **Non-clustered index**: Doesn't affect how rows are stored. It's a separate lookup table that points to the actual data. You can have several non-clustered indexes.

```sql
-- Creating a clustered index (usually on the primary key)
CREATE CLUSTERED INDEX idx_employees_id ON employees(employee_id);

-- Creating a non-clustered index
CREATE NONCLUSTERED INDEX idx_employees_dept ON employees(department_id);
```

Choosing the right index type depends on how you're querying the data; range queries often benefit from clustered indexes, while exact lookups do well with non-clustered ones. 