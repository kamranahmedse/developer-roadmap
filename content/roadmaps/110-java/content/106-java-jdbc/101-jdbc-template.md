## **JDBC Template**

JdbcTemplate is a central class in the JDBC core package that simplifies the use of JDBC and helps to avoid common errors. It internally uses JDBC API and eliminates a lot of problems with JDBC API. It executes SQL queries or updates, initiating iteration over ResultSets and catching JDBC exceptions and translating them to the generic. It executes core JDBC workflow, leaving application code to provide SQL and extract results. It handles the exception and provides the informative exception messages with the help of exception classes defined in the org.springframework.dao package.

## **JDBC Template Queries**
**Basic query to count students stored in the database using JdbcTemplate.**<br>
int result = jdbcTemplate.queryForObject(<br>
"SELECT COUNT(*) FROM STUDENT", Integer.class);<br>

**And here’s a simple INSERT:**
public int addStudent(int id) <br>
{<br>
  return jdbcTemplate.update("INSERT INTO STUDENT VALUES (?, ?, ?)", id, "megan", "India");<br>
}

