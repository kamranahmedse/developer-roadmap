# Transactions

**Transactions** play a vital role in maintaining data consistency and integrity within a database. They represent a single unit of work that consists of multiple operations executed in a sequence. In this section, we'll discuss the concept of transactions in MongoDB, their usage, and how they help in accomplishing various operations.

## Overview

MongoDB supports multi-document transactions, enabling you to perform multiple read and write operations across several documents within a single, atomic transaction. A transaction might involve several operations, for instance:

- Creating a new document
- Updating an existing document
- Deleting a document
- Reading documents

The fundamental purpose of a transaction is to either execute **all** or **none** of its operations. This means that, in case any operation within the transaction fails, the entire transaction will be aborted, and the database will return to its initial state, thus ensuring data consistency.

Transactions in MongoDB are essential to achieve the following **ACID** properties:

- **Atomicity**: Ensures that either all the operations in the transaction are executed, or none are.
- **Consistency**: Guarantees that, upon completing a transaction, the database remains in a consistent state.
- **Isolation**: Secures that the operations within the transaction are isolated from other transactions being executed simultaneously.
- **Durability**: Warrants that once a transaction is successfully completed, its effects will be stored persistently in the database.

## Usage

To begin a transaction in MongoDB, you'll need to obtain a session and then start the transaction using the `startTransaction()` method. After performing the necessary operations, you may `commit` the transaction to apply the changes to the database, or `abort` to discard the changes.

Here's an example to illustrate transactions:

```javascript
// Start a session
const session = client.startSession();

// Start a transaction within the session
session.startTransaction();

try {
  // Perform various operations within the transaction
  const operation1 = await collection1.insertOne(doc1, { session });
  const operation2 = await collection2.updateOne(condition, update, {
    session,
  });
  const operation3 = await collection3.deleteOne(doc3, { session });

  // Commit the transaction
  await session.commitTransaction();
} catch (error) {
  // If any operation fails, abort the transaction
  await session.abortTransaction();
} finally {
  // End the session
  session.endSession();
}
```

## Limitations

While transactions provide immense benefits regarding data consistency and integrity, it is vital to be aware of some of its limitations:

- They are available only in MongoDB versions 4.0 and above.
- They can cause performance overhead, especially for write-heavy workloads.
- In MongoDB clusters, transactions only support a maximum duration of 60 seconds.

In summary, transactions are a powerful feature of MongoDB, ensuring data integrity, and consistency in the database. By understanding their usage and implications, you can effectively utilize them in your application according to your specific requirements.
