# JDBC Template

JDBCTemplate is a central class in Spring's JDBC core package that simplifies the use of JDBC and helps to avoid common errors. It internally uses JDBC API and eliminates many problems with JDBC API. It executes SQL queries or updates, initiating iteration over ResultSets, catching JDBC exceptions, and translating them to the generic. It executes core JDBC workflow, leaving application code to provide SQL and extract results. It handles the exception and provides informative exception messages with the help of exception classes defined in the `org.springframework.dao` package.

Visit the following resources to learn more:

- [@article@JDBC Template tutorial](https://www.baeldung.com/spring-jdbc-jdbctemplate)
