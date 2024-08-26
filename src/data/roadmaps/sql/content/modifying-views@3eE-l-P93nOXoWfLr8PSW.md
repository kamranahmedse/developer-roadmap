# Modifying Views

In SQL, you can modify a `VIEW` in two ways:

- Using `CREATE` OR `REPLACE VIEW`: This command helps you modify a VIEW but keeps the VIEW name intact. This is beneficial when you want to change the definition of the `VIEW` but do not want to change the VIEW name.

- Using the `DROP VIEW` and then `CREATE VIEW`: In this method, you first remove the `VIEW` using the `DROP VIEW` command and then recreate the view using the new definition with the `CREATE VIEW` command.

Learn more from the following resources:

- [@article@Modify Views in SQL Server](https://www.sqlshack.com/create-view-sql-modifying-views-in-sql-server/)