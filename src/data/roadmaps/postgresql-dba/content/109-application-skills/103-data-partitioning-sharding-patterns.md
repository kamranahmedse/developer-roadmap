# Data Partitioning / Sharding Patterns

## Data Partitioning and Sharding Patterns

In this section, we'll discuss various data partitioning and sharding patterns to manage and scale PostgreSQL databases efficiently. These patterns are essential for DBAs as they help improve database performance, reduce query latency, and distribute loads across multiple servers.

### Data Partitioning

**Partitioning** is the practice of splitting large tables into smaller, manageable tables for performance improvement. PostgreSQL supports several partitioning methods, including:

- Range Partitioning
- List Partitioning
- Hash Partitioning

#### Range Partitioning

This method is used when the data can be divided into a specific range. For example, if you have a table with timestamp data, you can partition it into monthly or yearly ranges.

```sql
CREATE TABLE orders (
    id INT NOT NULL,
    order_date DATE NOT NULL,
    amount NUMERIC(10, 2) NOT NULL
) PARTITION BY RANGE (order_date);

CREATE TABLE orders_2019 PARTITION OF orders
    FOR VALUES FROM ('2019-01-01') TO ('2020-01-01');

CREATE TABLE orders_2020 PARTITION OF orders
    FOR VALUES FROM ('2020-01-01') TO ('2021-01-01');
```

#### List Partitioning

In list partitioning, the data is divided based on a predefined list of values. A typical use case is when you have a known set of values for a column, such as regions or user roles.

```sql
CREATE TABLE users (
    id INT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL
) PARTITION BY LIST (role);

CREATE TABLE users_admins PARTITION OF users
    FOR VALUES IN ('admin', 'superadmin');

CREATE TABLE users_customers PARTITION OF users
    FOR VALUES IN ('customer', 'guest');
```

#### Hash Partitioning

This method is suitable for distributing data evenly across partitions, especially when the data doesn't fit well into ranges or lists. The data is partitioned based on a hash function applied to a certain column.

```sql
CREATE TABLE products (
    id INT NOT NULL,
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL
) PARTITION BY HASH (id);

CREATE TABLE products_part1 PARTITION OF products
    FOR VALUES WITH (MODULUS 4, REMAINDER 0);

CREATE TABLE products_part2 PARTITION OF products
    FOR VALUES WITH (MODULUS 4, REMAINDER 1);

CREATE TABLE products_part3 PARTITION OF products
    FOR VALUES WITH (MODULUS 4, REMAINDER 2);

CREATE TABLE products_part4 PARTITION OF products
    FOR VALUES WITH (MODULUS 4, REMAINDER 3);
```

### Sharding Patterns

**Sharding** is a technique for distributing data across multiple servers (shards) to spread the load and increase performance. PostgreSQL supports several sharding methods, including:

- External Sharding
- Citus Extension (a popular extension for sharding in PostgreSQL)

#### External Sharding

In this method, the sharding logic is implemented outside the database, usually in the application layer. Each shard is a separate PostgreSQL instance, and the application is responsible for directing queries to the correct shard based on a sharding key.

#### Citus Extension

Citus is an extension for PostgreSQL that enables horizontal scaling by transparently sharding data across multiple nodes. It supports various distribution schemes, such as hash, range, and append distribution.

To use Citus, first install the extension and create a distributed table:

```sql
CREATE EXTENSION citus;

SELECT create_distributed_table('table_name', 'sharding_key');
```

### Conclusion

Data partitioning and sharding are essential techniques for scaling PostgreSQL databases and improving performance. As a DBA, understanding and implementing different partitioning methods (range, list, hash), as well as sharding patterns (external sharding, Citus extension) helps you manage your databases effectively and meet application requirements.