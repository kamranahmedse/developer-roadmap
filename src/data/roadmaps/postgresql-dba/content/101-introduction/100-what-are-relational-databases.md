# What are Relational Databases?

Relational databases are a type of database management system (DBMS) that stores and organizes data in a structured format called tables. These tables are made up of rows, also known as records or tuples, and columns, which are also called attributes or fields. The term "relational" comes from the fact that these tables can be related to one another through keys and relationships.

## Key Concepts

- **Table**: A table is a collection of data organized into rows and columns. Each table has a unique name and represents a specific object or activity in the database.
- **Row**: A row is a single entry in a table, containing a specific instance of data. Each row in a table has the same columns and represents a single record.
- **Column**: A column is a data field in a table, representing a specific attribute of the data. Columns have a unique name and a specific data type.
- **Primary Key**: A primary key is a column (or a set of columns) in a table that uniquely identifies each row. No two rows can have the same primary key value.
- **Foreign Key**: A foreign key is a column (or a set of columns) in a table that refers to the primary key of another table. It is used to establish relationships between tables.

## Relationships

One of the main advantages of a relational database is its ability to represent relationships between tables. These relationships could be one-to-one, one-to-many, or many-to-many relationships. They allow for efficient querying and manipulation of related data across multiple tables.

- **One-to-One**: This is a relationship where a row in one table has a single corresponding row in another table. For example, a person could have a single passport, and a passport can only belong to one person.
- **One-to-Many**: This is a relationship where a row in one table can have multiple corresponding rows in another table. For example, a customer can have multiple orders, but an order can only belong to one customer.
- **Many-to-Many**: This is a relationship where multiple rows in one table can have multiple corresponding rows in another table. To represent a many-to-many relationship, a third table, called a junction table or associative table, is needed. For example, a student can enroll in multiple courses, and a course can have multiple students enrolled.

## Advantages of Relational Databases

Relational databases offer several advantages in terms of efficiency, flexibility, and data integrity:

- **Structured Data**: The table-based organization of relational databases makes them well-suited for handling structured data, which has a consistent structure and can be easily mapped to the columns and rows of a table.
- **Data Integrity**: Relational databases use primary and foreign keys to maintain consistent relationships between related data, reducing the chances of data inconsistency and redundancy.
- **Scalability**: Relational databases can handle large amounts of structured data and can be scaled to accommodate growing data requirements.
- **Querying**: The SQL (Structured Query Language) is used for querying, updating, and managing relational databases, providing a powerful and standardized way to access and manipulate the data.

In summary, relational databases are a powerful and versatile tool for storing and managing structured data. Their ability to represent relationships among data and to ensure data integrity make them the backbone of many applications and services.

- [@article@Relational Databases: concept and history](https://www.ibm.com/topics/relational-databases)