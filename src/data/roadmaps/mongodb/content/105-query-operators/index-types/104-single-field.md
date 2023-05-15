# Single Field

In MongoDB, a single field index is an index that sorts and organizes the data based on a single field inside your documents. It can be either on a top-level field or on a nested field (sub-field in an embedded document). Single field indexes are useful to improve the performance of read operations, making it faster to search for documents containing a specific field value.

## Creating a Single Field Index

To create a single field index, you can use the `db.collection.createIndex()` function, specifying the field name and the sorting order (1 for ascending or -1 for descending order). For example:

```javascript
db.users.createIndex({ name: 1 });
```

This command creates an ascending index on the `name` field of the `users` collection.

## Unique Single Field Index

You can create a unique single-field index to prevent the insertion of duplicate values for a specific field. To create a unique index, include the `unique` option and set its value to `true`:

```javascript
db.users.createIndex({ email: 1 }, { unique: true });
```

This command ensures each document in the collection has a unique email value.

## Sparse Single Field Index

A sparse single field index is an index that only considers the documents with the indexed field. This type of index might not index all the documents in a collection, resulting in reduced index size and better performance. To create a sparse index, include the `sparse` option and set its value to `true`:

```javascript
db.customers.createIndex({ 'address.zipcode': 1 }, { sparse: true });
```

This command creates a sparse index on the `zipcode` field of the `address` sub-document.

## Use cases

A single field index is well-suited in use cases where you commonly search, sort, or filter documents based on a specific field value. Examples include finding all documents with a particular age, sorting blog posts by title, or looking up users by their email addresses. By utilizing single-field indexes, you can significantly boost the performance of these common operations.
