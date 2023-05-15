# RDBMS Concepts

Relational Database Management Systems (RDBMS) are a type of database management system which stores and organizes data in tables, making it easy to manipulate, query, and manage the information. They follow the relational model defined by E.F. Codd in 1970, which means that data is represented as tables with rows and columns.

In this section, we will briefly summarize the key concepts of RDBMS:

## Tables and Relations

A table (also known as a relation) is a collection of rows (tuples) and columns (attributes). Each row represents a specific record, and each column represents an attribute of that record. The columns define the structure of the table and the type of data that can be stored in it.

```markdown
Example:

| id | first_name | last_name |
|----|------------|-----------|
| 1  | John       | Doe       |
| 2  | Jane       | Smith     |
```

## Keys

- Primary Key: A primary key is a unique identifier for each record in the table. It can be a single column or a combination of columns. No two rows can have the same primary key value.
- Foreign Key: A foreign key is a column (or a set of columns) that references the primary key of another table, establishing a relationship between the two tables.

## Data Types

RDBMS supports various data types for storing different types of data. Some of the common data types include:

- Integer (int)
- Floating-point (float, real)
- Numeric (decimal, number)
- DateTime (date, time, timestamp)
- Character (char, varchar, text)
- Boolean (bool)

## Schema

The schema is the structure that defines tables, views, indexes, and their relationships in a database. It includes the definition of attributes, primary and foreign keys, and constraints that enforce data integrity.

## Normalization

Normalization is the process of organizing data in a database to reduce redundancy, eliminate data anomalies, and ensure proper relationships between tables. There are multiple levels of normalization, referred to as normal forms (1NF, 2NF, 3NF, etc.).

## ACID Properties

ACID (Atomicity, Consistency, Isolation, Durability) is a set of properties that ensure database transactions are reliable and maintain data integrity:

- Atomicity: All operations in a transaction succeed or fail as a unit.
- Consistency: The database remains in a consistent state before and after a transaction.
- Isolation: Transactions are isolated from each other, ensuring that their execution does not interfere with one another.
- Durability: Once a transaction is committed, its effects are permanently saved in the database.

## SQL

Structured Query Language (SQL) is the standard language used to communicate with a relational database. SQL is used to insert, update, delete, and retrieve data in the tables, as well as manage the database itself.

In conclusion, understanding RDBMS concepts is essential for working with PostgreSQL and other relational databases. Familiarity with these concepts will allow you to design efficient database schemas, use SQL effectively, and maintain data integrity in your applications.