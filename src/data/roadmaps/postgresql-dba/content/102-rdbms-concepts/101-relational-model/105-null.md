# NULL

### Null Values in PostgreSQL

In the relational model, `null` is a special marker that signifies the absence of a value for a specific attribute. In other words, it represents the "unknown" or "undefined" state of a particular column in a relational database. This chapter will discuss the key aspects and implications of using null values in PostgreSQL.

#### Why Null is important?

Often, in real-world databases, there might be situations where we do not have all the necessary information to complete a record. For instance, when a new customer registers for an online shopping platform, they might provide their name and email, but leave the optional phone number field blank. In such cases, PostgreSQL uses null to store such empty fields.

#### Handling Null in PostgreSQL

It is important to understand how to work with null values in PostgreSQL since they have their own unique set of rules, especially when it comes to querying data. Here are some important points to consider while dealing with null values:

1. *Comparison Operators*: Comparing null values can be tricky. Regular comparison operators, such as '=' or '<>', will return null when used with a null value. To specifically check for null, use the `IS NULL` or `IS NOT NULL` condition.

   ```sql
   SELECT * FROM customers WHERE phone_number IS NULL;
   ```

2. *Aggregate Functions*: Most aggregate functions like `COUNT()`, `AVG()`, `SUM()` etc., ignore null values when applied to a set of records.

   ```sql
   SELECT AVG(salary) FROM employees WHERE department = 'HR';
   ```
   This query will return the average salary of non-null records in the HR department.

3. *Null in Joins*: When using joins, records with null values in the join column will be ignored, unless you are using an outer join.

4. *Inserting Null values*: To insert a null value for a column while adding a new record to the table, use the `DEFAULT` keyword or simply leave the field value empty.

   ```sql
   INSERT INTO customers (name, email, phone_number) VALUES ('John Doe', 'john@example.com', DEFAULT);
   ```

5. *Updating records with Null*: You can set a column value to null using an UPDATE query.

   ```sql
   UPDATE customers SET phone_number = NULL WHERE email = 'john@example.com';
   ```

6. *Coalesce function*: To handle null values and provide a default value in case of null, you can use the `COALESCE()` function. It accepts a list of arguments and returns the first non-null value.

   ```sql
   SELECT COALESCE(phone_number, 'N/A') as phone_number FROM customers;
   ```

#### Conclusion

Understanding the concept of null values in PostgreSQL is essential as a DBA because they are commonly encountered while working with real-world data. Handling nulls correctly ensures accurate query results and maintains data integrity within the database. With this foundational knowledge on nulls, you now have a better grasp on its implications and can handle them more effectively in PostgreSQL.