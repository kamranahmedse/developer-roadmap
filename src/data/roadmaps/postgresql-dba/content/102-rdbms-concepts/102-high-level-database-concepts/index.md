# High Level Database Concepts

# High-Level Database Concepts

In this section, we will discuss key high-level concepts that are crucial for understanding and effectively managing PostgreSQL databases. Let's dive in!

## Relational Database Management System (RDBMS)

A Relational Database Management System (RDBMS) is a software system that allows you to create, update, and manage a relational database. Some popular RDBMSs include PostgreSQL, MySQL, Oracle, and SQL Server. In an RDBMS, data is organized in tables - consisting of rows and columns - and these tables are related to one another through keys.

### Tables

A table is a collection of related data, organized in *rows* and *columns*. Columns represent attributes or properties of the data, whereas rows represent individual records or instances of data.

For example, consider a table representing `employees`. Each row would represent a single employee, and columns describe employee attributes such as `employee_id`, `first_name`, `last_name`, etc.

### Columns

Columns are the attributes or properties that describe data within a table. They are also called fields, and each column has a specific name and data type.

For example, in the `employees` table, we might have columns for employee details:

- `employee_id`: Integer, uniquely identifies an employee.
- `first_name`: String, represents the employee's first name.
- `last_name`: String, represents the employee's last name.
- `dob`: Date, represents the employee's date of birth.

### Rows

Rows, also known as records, represent individual instances or entries in a table. They contain values for each of the columns in the table.

Continuing the `employees` table example, a row might contain the following data:

- `employee_id`: 1
- `first_name`: "John"
- `last_name`: "Doe"
- `dob`: "1990-01-01"

### Keys

Keys are used to establish relationships between tables and enforce constraints, such as ensuring uniqueness or referential integrity.

- **Primary Key**: A primary key uniquely identifies each record in a table. A table can only have one primary key, and its values must be unique and non-null.
- **Foreign Key**: A foreign key refers to a primary key from another table, helping to establish relationships between tables and ensure referential integrity.

## SQL (Structured Query Language)

SQL is the standard language used to interact with RDBMSs such as PostgreSQL. SQL allows you to perform a wide range of tasks including data definition, manipulation, control, and querying.

### Data Definition Language (DDL)

DDL includes statements for defining and altering the structure of database objects, such as tables, indexes, and views.

Examples of DDL statements include:

- `CREATE TABLE`: defines a new table in the database.
- `ALTER TABLE`: modifies an existing table.
- `DROP TABLE`: removes a table from the database.

### Data Manipulation Language (DML)

DML includes statements for managing the data stored within tables, such as inserting, updating, or deleting records.

Examples of DML statements include:

- `INSERT`: adds a new record to a table.
- `UPDATE`: modifies an existing record in a table.
- `DELETE`: removes a record from a table.

### Data Query Language (DQL)

DQL includes statements for obtaining information from the database, such as retrieving data or generating reports.

Examples of DQL statements include:

- `SELECT`: retrieves data from one or more tables or other database objects.

### Data Control Language (DCL)

DCL includes statements for managing user permissions and access control within the database.

Examples of DCL statements include:

- `GRANT`: gives a user specific privileges on a database object.
- `REVOKE`: removes privileges on a database object from a user.

In summary, understanding high-level database concepts such as tables, keys, and SQL is critical for effectively managing PostgreSQL databases. By gaining proficiency in these topics, you can more easily navigate and work with your database structures and data.