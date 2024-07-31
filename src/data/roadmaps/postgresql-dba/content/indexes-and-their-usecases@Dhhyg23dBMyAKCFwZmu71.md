# Indexes Use Cases

Indexes in PostgreSQL improve query performance by allowing faster data retrieval. Common use cases include:

- Primary and Unique Keys: Ensure fast access to rows based on unique identifiers.
- Foreign Keys: Speed up joins between related tables.
- Search Queries: Optimize searches on large text fields with full-text search indexes.
- Range Queries: Improve performance for range-based queries on date, time, or numerical fields.
- Partial Indexes: Create indexes on a subset of data, useful for frequently queried columns with specific conditions.
-	Expression Indexes: Index expressions or functions, enhancing performance for queries involving complex calculations.
- Composite Indexes: Optimize multi-column searches by indexing multiple fields together.
- GIN and GiST Indexes: Enhance performance for array, JSONB, and geometric data types.