# Data Normalization: Normal Forms

Data normalization in PostgreSQL involves organizing tables to minimize redundancy and ensure data integrity through a series of normal forms: First Normal Form (1NF) ensures each column contains atomic values and records are unique; Second Normal Form (2NF) requires that all non-key attributes are fully dependent on the primary key; Third Normal Form (3NF) eliminates transitive dependencies so non-key attributes depend only on the primary key; Boyce-Codd Normal Form (BCNF) further ensures that every determinant is a candidate key; Fourth Normal Form (4NF) removes multi-valued dependencies; and Fifth Normal Form (5NF) addresses join dependencies, ensuring tables are decomposed without loss of data integrity. These forms create a robust framework for efficient, consistent, and reliable database schema design.

Learn more from the following resources:

- [@article@A Guide to Data Normalization in PostgreSQL ](https://www.cybertec-postgresql.com/en/data-normalization-in-postgresql/)
- [@video@First normal form](https://www.youtube.com/watch?v=PCdZGzaxwXk)
- [@video@Second normal form](https://www.youtube.com/watch?v=_NHkY6Yvh64)
- [@video@Third normal form](https://www.youtube.com/watch?v=IN2m7VtYbEU)