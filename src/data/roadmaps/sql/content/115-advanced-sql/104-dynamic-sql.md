# Dynamic SQL

**Dynamic SQL**

Dynamic SQL is a programming method that allows you to build SQL statements dynamically at runtime. It allows you to create more flexible and adaptable applications because you can manipulate the SQL statements on the fly, in response to inputs or changing conditions.

Consider an application where a user can choose multiple search conditions from a range of choices. You might not know how many conditions the user will choose, or what they'll be until runtime. With static SQL, you would have to include a large number of potential search conditions in your WHERE clause. With dynamic SQL, you can build the search string based on the user's actual choices.

**Executing Dynamic SQL**

There are two ways to execute dynamic SQL:

1. `EXECUTE IMMEDIATE` statement
2. `OPEN-FOR, FETCH, CLOSE` statements


**Code Examples**

1. Using `EXECUTE IMMEDIATE`:

Here, a table name is passed as a variable to a PL/SQL block. The block concatenates the variable into a DELETE statement, which is executed dynamically.

```sql
DECLARE 
   table_name VARCHAR(30) := 'employees'; 
   sql_stmt   VARCHAR(100); 
BEGIN 
   sql_stmt := 'DELETE FROM ' || table_name; 
   EXECUTE IMMEDIATE sql_stmt; 
END;
```

2. Using `OPEN-FOR, FETCH, CLOSE`

In this example, a dynamic SQL query is being built and executed using the `OPEN-FOR, FETCH, CLOSE` statements.

```sql
DECLARE 
   sql_stmt  VARCHAR2(1000);
   emp_id    NUMBER(4) := 7566; 
   emp_rec   emp%ROWTYPE; 
BEGIN 
   sql_stmt := 'SELECT * FROM emp WHERE empno = :id'; 
   OPEN emp_cv FOR sql_stmt USING emp_id; 
   FETCH emp_cv INTO emp_rec; 
   CLOSE emp_cv; 
END;
```

Note that while the use of Dynamic SQL offers greater flexibility, it also comes with potential security risks such as SQL Injection, and should be used judiciously. Always validate and sanitize inputs when building dynamic queries.