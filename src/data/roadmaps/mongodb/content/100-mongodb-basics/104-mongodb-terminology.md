# MongoDB Terminology

This section of the guide will introduce you to the basic terminology used while working with MongoDB. Understanding these terms will help you to grasp the fundamentals of MongoDB and make it easier for you to follow along with the rest of the guide.

## MongoDB Terminology

- **Database:** A MongoDB database is used to store and manage a set of collections. It consists of various collections, indexes, and other essential data structures required to store the data efficiently.

- **Collection:** A collection in MongoDB is a group of documents. The name of a collection must be unique within its database. Collections can be viewed as the table equivalencies in a relational database.

- **Document:** A document is a record in a MongoDB collection. It is comprised of a set of fields, similar to a row in a relational database. However, unlike tables in a relational database, no schema or specific structure is enforced on the documents within a collection.

- **Field:** A field in MongoDB is a key-value pair inside a document. It can store various types of data, including strings, numbers, arrays, and other documents. Fields in MongoDB can be seen as columns in a relational database.

- **Index:** Indexes in MongoDB are data structures that improve the speed of common search operations. They store a small portion of the dataset in a well-organized structure. This structure allows MongoDB to search and sort documents faster by reducing the number of documents it has to scan.

- **Query:** A query in MongoDB is used to retrieve data from the database. It retrieves specific documents or subsets of documents from a collection based on a given condition.

- **Cursor:** A cursor is a pointer to the result set of a query. It allows developers to process individual documents from the result set in an efficient manner.

- **Aggregation:** Aggregation in MongoDB is the process of summarizing and transforming the data stored in collections. It is used to run complex analytical operations on the dataset or create summary reports.

- **Replica Set:** A replica set in MongoDB is a group of mongodb instances that maintain the same data set. It provides redundancy, high availability, and automatic failover in case the primary node becomes unreachable.

- **Sharding:** Sharding is a method of distributing data across multiple machines. It is used in MongoDB to horizontally scale the database by partitioning the dataset into smaller, more manageable chunks called shards.
