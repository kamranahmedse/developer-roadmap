# Migrations

As your application evolves, your database schema will likely need to change. Database migrations provide a structured way to apply these changes in a controlled and repeatable manner. In D1, you'll typically write SQL scripts that contain the necessary `ALTER TABLE` statements to modify your schema (e.g., adding new columns, renaming columns, changing data types). You can then use `wrangler` or a similar tool to execute these migration scripts against your D1 database. It's important to version your migration scripts and apply them in the correct order to avoid data inconsistencies or errors. Consider using a migration management tool to track and apply migrations more effectively.

Visit the following resources to learn more:

- [@article@Database Migrations: What are the Types of DB Migrations?](https://www.prisma.io/dataguide/types/relational/what-are-database-migrations)
- [@article@Database Migrations in the Real World](https://blog.jetbrains.com/idea/2025/02/database-migrations-in-the-real-world/)