# Per-User Per-Database Settings in PostgreSQL

In PostgreSQL, per-user and per-database settings allow administrators to customize configurations for specific users or databases, enhancing performance and management. These settings are managed using the ALTER ROLE and ALTER DATABASE commands.

These commands store the settings in the system catalog and apply them whenever the user connects to the database or the database is accessed. Commonly customized parameters include search_path, work_mem, and maintenance_work_mem, allowing fine-tuned control over query performance and resource usage tailored to specific needs.

Learn more from the following resources:

- [@official@ALTER ROLE](https://www.postgresql.org/docs/current/sql-alterrole.html)
- [@official@ALTER DATABASE](https://www.postgresql.org/docs/current/sql-alterdatabase.html)
