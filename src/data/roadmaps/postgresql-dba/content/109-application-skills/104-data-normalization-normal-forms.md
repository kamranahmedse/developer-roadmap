# Data Normalization / Normal Forms

## Data Normalization and Normal Forms

Data normalization is the process of organizing the columns and tables in a relational database to minimize redundancy and dependency. The primary goal of normalization is to improve data integrity, ensure data consistency, and to reduce the storage and query complexity.

The normalization process generally follows the design principles called **"Normal Forms"**. There are several normal forms, but in this guide, we will focus on the first three, which are commonly used in database design:

### 1. First Normal Form (1NF)

First Normal Form is achieved when:

- Each table has a unique key, also known as a primary key.
- All attributes in the table are atomic, meaning that they cannot be further decomposed. For example, a column with a list of comma-separated values would violate 1NF.
- Each column should contain only one value per row for a given attribute.

By adhering to 1NF, you eliminate repeating groups and ensure that your data is well-structured, which makes it easier to maintain and query the database.

### 2. Second Normal Form (2NF)

A table is in Second Normal Form when it meets the following criteria:

- It is already in 1NF.
- All non-primary key columns are dependent on the primary key.

In other words, 2NF eliminates partial dependencies. Partial dependency occurs when a non-primary key column is dependent on only a part of the primary key in a composite key situation. To achieve 2NF, you may need to split your table into smaller tables and ensure that all non-key columns are dependent on the primary key.

### 3. Third Normal Form (3NF)

A table is in Third Normal Form if:

- It is already in 2NF.
- There are no transitive dependencies between non-key columns.

A transitive dependency occurs when a non-key column is dependent on another non-key column, which in turn is dependent on the primary key. To achieve 3NF, you should eliminate any transitive dependencies by splitting the table into smaller tables.

By adhering to these three normal forms, you will design a database schema that is well-structured, efficient, and reduces data redundancy and update anomalies. However, remember that normalization is not always the ultimate goal. Sometimes, de-normalization is applied to improve query performance. Therefore, it's essential to analyze your database requirements and decide which level of normalization is suitable for your specific use-case.