An index helps the database find data faster. It works like a book index, pointing to rows that match a query without scanning the entire table.

For example, you can create an index on the last name column so that you can retrieve users faster based on their last name:

```sql
-- Create an index on the last_name column
CREATE INDEX idx_employee_last_name
ON employees (last_name);
```

![SQL index](https://assets.roadmap.sh/guest/sql-index-tp3zi.png)

Indexes are great for speeding up searches, data retrieval, and JOIN operations. They're also useful for maintaining performance in large SQL databases where quick lookups matter. 