# Counting Documents

When working with MongoDB, you might often need to know the number of documents present in a collection. MongoDB provides a few methods to efficiently count documents in a collection. In this section, we will discuss the following methods:

- `countDocuments()`
- `estimatedDocumentCount()`

## countDocuments()

The `countDocuments()` method is used to count the number of documents in a collection based on a specified filter. It provides an accurate count that may involve reading all documents in the collection.

**Syntax:**

```javascript
collection.countDocuments(filter, options);
```

- `filter`: (Optional) A query that will filter the documents before the count is applied.
- `options`: (Optional) Additional options for the count operation such as `skip`, `limit`, and `collation`.

**Example:**

```javascript
db.collection('orders').countDocuments(
  { status: 'completed' },
  (err, count) => {
    console.log('Number of completed orders: ', count);
  }
);
```

In the example above, we count the number of documents in the `orders` collection that have a`status` field equal to `'completed'`.

## estimatedDocumentCount()

The `estimatedDocumentCount()` method provides an approximate count of documents in the collection, without applying any filters. This method uses the collection's metadata to determine the count and is generally faster than `countDocuments()`.

**Syntax:**

```javascript
collection.estimatedDocumentCount(options);
```

- `options`: (Optional) Additional options for the count operation such as `maxTimeMS`.

**Example:**

```javascript
db.collection('orders').estimatedDocumentCount((err, count) => {
  console.log('Estimated number of orders: ', count);
});
```

In the example above, we get the estimated number of documents in the `orders` collection.

Keep in mind that you should use the `countDocuments()` method when you need to apply filters to count documents, while `estimatedDocumentCount()` should be used when an approximate count is sufficient and you don't need to apply any filters.
