# Vacuuming in PostgreSQL

Vacuuming is an essential component in PostgreSQL maintenance tasks. By reclaiming storage, optimizing performance, and keeping the database lean, vacuuming helps maintain the health of your PostgreSQL system. During the normal operation of PostgreSQL, database tuples (rows) are updated, deleted and added. This can lead to fragmentation, wasted space, and decreased efficiency. Vacuuming is used to:

- Reclaim storage space used by dead rows.
- Update statistics for the query planner.
- Make unused space available for return to the operating system.
- Maintain the visibility map in indexed relations.

Learn more from the following resources:

- [@official@VACUUM](https://www.postgresql.org/docs/current/sql-vacuum.html)
- [@official@Routine Vacuuming](https://www.postgresql.org/docs/current/routine-vacuuming.html)
- [@article@PostgreSQL Vacuuming Command to Optimize Database Performance](https://www.percona.com/blog/postgresql-vacuuming-to-optimize-database-performance-and-reclaim-space/)