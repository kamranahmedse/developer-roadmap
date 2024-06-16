# Code First Migrations

Code First Migrations is a feature of Entity Framework that enables you to change the model classes in your application and then propagate those changes to the database. When you use Code First Migrations, Entity Framework generates the necessary SQL commands to update the database schema to match the model classes.

To use Code First Migrations, you need to enable it in your Entity Framework application. This can be done by adding a reference to the Entity Framework Migrations NuGet package, and then enabling Migrations in your application.

Once Migrations is enabled, you can use the Package Manager Console to add a new migration to your application. This will generate a class that contains the necessary SQL commands to update the database schema. You can then use the Update-Database command to apply the migration to the database.

- [@article@What is a Code First Migration?](https://www.entityframeworktutorial.net/code-first/what-is-code-first.aspx)
- [@article@Example for Code First Migrations](https://learn.microsoft.com/en-us/ef/ef6/modeling/code-first/migrations/)
- [@article@Code First Migrations in Entity Framework](https://www.c-sharpcorner.com/UploadFile/26b237/code-first-migrations-in-entity-framework/)
