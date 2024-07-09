# Vacuuming in PostgreSQL

Vacuuming is an essential component in PostgreSQL maintenance tasks. By reclaiming storage, optimizing performance, and keeping the database lean, vacuuming helps maintain the health of your PostgreSQL system. This section will introduce you to the basics of vacuuming, its types, and how to configure it.

## Why Vacuum?

During the normal operation of PostgreSQL, database tuples (rows) are updated, deleted and added. This can lead to fragmentation, wasted space, and decreased efficiency. Vacuuming is used to:

- Reclaim storage space used by dead rows.
- Update statistics for the query planner.
- Make unused space available for return to the operating system.
- Maintain the visibility map in indexed relations.

## Types of Vacuum

In PostgreSQL, there are three vacuum types:

- **Normal (manual) vacuum**: Simply removes dead row versions and makes space available for re-use inside individual tables.
- **Full vacuum**: Performs a more thorough cleaning operation, reclaiming all dead row space and returning it to the operating system. It requires an exclusive table lock, making it less suitable for production environments.
- **Auto-vacuum**: An automated version of the normal vacuum that acts based on internal parameters and statistics.

## Configuring Auto-Vacuum

Auto-vacuum is an essential PostgreSQL feature and is enabled by default. You can adjust some settings for optimal system performance:

- `autovacuum_vacuum_scale_factor`: Specifies the fraction of a table's total size that must be composed of dead tuples before a vacuum is launched. Default is `0.2` (20%).
- `autovacuum_analyze_scale_factor`: Specifies the fraction of a table's total size that must be composed of changed tuples before an analyze operation is launched. Default is `0.1` (10%).
- `autovacuum_vacuum_cost_limit`: Sets the cost limit value for vacuuming a single table. Higher cost limit values lead to more aggressive vacuuming. Default is `200`.

To disable auto-vacuum for a particular table, you can use the following command:

```sql
ALTER TABLE table_name SET (autovacuum_enabled = false);
```

## Manual Vacuuming

For ad-hoc maintenance, you can still perform manual vacuum and vacuum full operations as desired:

- Normal vacuum: `VACUUM table_name;`
- Full vacuum: `VACUUM FULL table_name;`
- Analyze table: `VACUUM ANALYZE table_name;`

Keep in mind that running manual vacuum operations may temporarily impact performance due to resource consumption. Plan accordingly.

In summary, vacuuming is a crucial part of PostgreSQL performance optimization and space management. By understanding its types, purposes and customization options, you can ensure your PostgreSQL system is always in tip-top shape.