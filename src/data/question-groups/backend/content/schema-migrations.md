The two main aspects to consider when managing schema migrations, especially in CD environments are:

- Track your schema migrations inside version control. Keep these files versions with your code, as there is a direct relation between those versions.
- Use automated migration tools such as [Flyway](https://flywaydb.org/) or [Liquibase](https://www.liquibase.com/) to simplify the process and keep it standard.