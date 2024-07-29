# PostgreSQL Roles

In PostgreSQL, roles are entities that manage database access permissions, combining user and group functionalities. Roles can own database objects and have privileges, such as the ability to create databases or tables. A role can be configured with login capabilities (login role), or it can be used purely for privilege management (group role). Roles can inherit permissions from other roles, simplifying the management of complex permission hierarchies. Key role attributes include `SUPERUSER` (full access), `CREATEDB` (ability to create databases), `CREATEROLE` (ability to create and manage other roles), and `REPLICATION` (replication-related privileges). Roles are created and managed using SQL commands such as `CREATE ROLE`, `ALTER ROLE`, and `DROP ROLE`.

Learn more from the following resources:

- [@video@For Your Eyes Only: Roles, Privileges, and Security in PostgreSQL](https://www.youtube.com/watch?v=mtPM3iZFE04)
- [@official@Database Roles](https://www.postgresql.org/docs/current/user-manag.html)
- [@official@Predefined Roles](https://www.postgresql.org/docs/current/predefined-roles.html)