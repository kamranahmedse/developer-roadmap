# Using Indexes

Indexes in SQL are database objects that improve the speed of data retrieval operations on database tables. They work similarly to an index in a book, allowing the database engine to quickly locate data without scanning the entire table. Proper use of indexes can significantly enhance query performance, especially for large tables. However, they come with trade-offs: while they speed up reads, they can slow down write operations (INSERT, UPDATE, DELETE) as the index also needs to be updated. Common types include B-tree indexes (default in most systems), bitmap indexes, and full-text indexes. Understanding when and how to create indexes is crucial for database optimization. This involves analyzing query patterns, understanding the data distribution, and balancing the needs of different types of operations on the database.

Learn more from the following resources:

