# Transactions

A transaction is a sequence of database operations that will only succeed if every operation within the transaction has been executed correctly.

In MongoDB, an operation on a single document is atomic. For situations that require atomicity of reads and writes to multiple documents (in a single or multiple collections), MongoDB supports multi-document transactions. With distributed transactions, transactions can be used across multiple operations, collections, databases, documents, and shards.

* [Transactions - MongoDB Docs](https://www.mongodb.com/docs/manual/core/transactions/)
* [Introduction to ACID Transactions in MongoDB](https://learn.mongodb.com/learn/course/mongodb-transactions/lesson-1-introduction-to-acid-transactions/learn?page=1)
* [MongoDB 4.2 Brings Fully Distributed ACID Transactions](https://www.youtube.com/watch?v=iuj4Hh5EQvo)







