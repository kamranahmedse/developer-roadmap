# JDBC Template

JDBCTemplate is a central class in the JDBC core package that simplifies the use of JDBC and helps to avoid common errors. It internally uses JDBC API and eliminates many problems with JDBC API. It executes SQL queries or updates, initiating iteration over ResultSets, catching JDBC exceptions, and translating them to the generic. It executes core JDBC workflow, leaving application code to provide SQL and extract results. It handles the exception and provides informative exception messages with the help of exception classes defined in the `org.springframework.dao` package.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.baeldung.com/spring-jdbc-jdbctemplate'>JDBC Template tutorial</BadgeLink>