# Dynamic SQL

Dynamic SQL is a programming method that allows you to build SQL statements dynamically at runtime. It allows you to create more flexible and adaptable applications because you can manipulate the SQL statements on the fly, in response to inputs or changing conditions.

Consider an application where a user can choose multiple search conditions from a range of choices. You might not know how many conditions the user will choose, or what they'll be until runtime. With static SQL, you would have to include a large number of potential search conditions in your WHERE clause. With dynamic SQL, you can build the search string based on the user's actual choices. Note that while the use of Dynamic SQL offers greater flexibility, it also comes with potential security risks such as SQL Injection, and should be used judiciously. Always validate and sanitize inputs when building dynamic queries.

Learn more from the following resources:

- [@article@Dynamic SQL in SQL Server](https://www.sqlshack.com/dynamic-sql-in-sql-server/)