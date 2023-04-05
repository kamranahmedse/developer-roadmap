# Retryable Reads / Writes

Retryable reads and writes are an essential feature in MongoDB that provides the ability to automatically retry certain read and write operations, ensuring data consistency and improving the fault tolerance of your applications. This feature is especially useful in case of transient network errors or replica set elections that may cause operations to fail temporarily.

## Retryable Reads

Retryable reads allow MongoDB to automatically retry eligible read operations if they fail due to a transient error. This ensures that the application can continue to perform read operations seamlessly without throwing errors at users due to temporary issues.

Examples of retryable read operations include:

- `find()`
- `aggregate()`
- `distinct()`

To enable retryable reads, use the following option in your client settings:

```javascript
{
  retryReads: true;
}
```

By default, newer versions of MongoDB (since v3.6) have retryable reads enabled.

## Retryable Writes

Similar to retryable reads, retryable writes allow MongoDB to automatically retry specific write operations that fail due to transient errors. This helps maintain data consistency and reduces the chances of data loss or duplicate writes.

Examples of retryable write operations include:

- `insertOne()`
- `updateOne()`
- `deleteOne()`
- `findOneAndUpdate()`

To enable retryable writes, use the following option in your client settings:

```javascript
{
  retryWrites: true;
}
```

By default, MongoDB has retryable writes enabled for replica sets and sharded clusters (since v4.0).

**Note**: It's important to ensure that you're using a compatible version of the MongoDB server and drivers to take full advantage of retryable reads and writes features. Additionally, these features are not supported in standalone configurations.

For more information, check the official [MongoDB documentation on retryable reads](https://docs.mongodb.com/manual/core/retryable-reads/) and [retryable writes](https://docs.mongodb.com/manual/core/retryable-writes/).
