# Hash Indexes

Hash Indexes are a type of database index that uses a hash function to map each row's key value into a fixed-length hashed key. The purpose of using a hash index is to enable quicker search operations by converting the key values into a more compact and easily searchable format. Let's discuss some important aspects and use cases of hash indexes in PostgreSQL.

## How Hash Indexes Work

In a hash index, the key values are passed through a hash function (e.g., MD5 or FNV-1a). This function generates a short, fixed-length hash value which can be easily compared during search operations. The rows with the same hash values are stored in "buckets", allowing for fast search and retrieval operations when looking for a specific key.

## Use Cases for Hash Indexes

- Equality queries: Hash indexes are designed for improving the performance of equality queries (`WHERE column = value`). Since hash indexes only store the hashed key values, they cannot be used for range queries or queries with other comparison operators (e.g., `<`, `>`, `LIKE`).

- High cardinality columns: In cases where a column has a high number of distinct values (high cardinality), hash indexes can reduce the overall index size and improve query performance.

- Low-selectivity indexes: When a large number of rows share the same key value, hash indexes can offer faster join operations by reducing the time required to match equal values.

## Limitations of Hash Indexes

- Not suitable for range queries: As mentioned earlier, hash indexes cannot be used for range queries or queries using comparison operators.

- Index size: The hash function might produce collisions, where multiple key values generate the same hash value. This can lead to increased index size and decreased performance in some cases.

- Unordered data: Since hash indexes store data in an unordered manner, they cannot be used for operations like `ORDER BY`, which require sorted data.

## Creating a Hash Index in PostgreSQL

To create a hash index in PostgreSQL, you can use the `CREATE INDEX` command with the `USING hash` clause:

```sql
CREATE INDEX index_name ON table_name USING hash(column_name);
```

_Example:_
```sql
CREATE INDEX employees_name_hash ON employees USING hash(name);
```

In conclusion, hash indexes can be a useful tool for optimizing query performance in specific scenarios, such as equality queries with high cardinality columns. However, it is important to consider the limitations and use cases before implementing hash indexes in your PostgreSQL database.