A **primary key** uniquely identifies each row in a table and is defined by a primary key constraint. It must be unique and cannot contain `NULL` values. Every table should have one primary key to ensure each record is identifiable.

![Primary key in a relational database management system](https://assets.roadmap.sh/guest/primary-key-in-a-relational-database-management-system-ce6qn.png)

For example, a user table can have a unique `id` that serves as the primary key:

```sql
CREATE TABLE users (
  id   INT PRIMARY KEY,
  name VARCHAR(100)
);
-- 'id' must be unique and non-null for every row.
``` 