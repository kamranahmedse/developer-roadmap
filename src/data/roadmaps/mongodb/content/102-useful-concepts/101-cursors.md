# Cursors

In MongoDB, a **cursor** is an object that enables you to iterate over and retrieve documents from a query result. When you execute a query to fetch documents from a database, MongoDB returns a pointer to the result set, known as a cursor. The cursor automatically takes care of batch processing of the result documents, providing an efficient way to handle large amounts of data.

Cursors play a vital role in managing database operations, particularly when working with large datasets. They can help improve the performance and reduce the memory footprint of your application.

## Basic Usage

When you execute a query, MongoDB implicitly creates a cursor. For example, using the `find()` method on a collection returns a cursor object:

```javascript
const cursor = db.collection('myCollection').find();
```

You can then iterate over the documents in the result set using the cursor's `forEach` method or other methods like `toArray()` or `next()`:

```javascript
cursor.forEach((doc) => {
  console.log(doc);
});
```

## Cursor Methods

Cursors provide several methods that allow you to manipulate the result set and control the query execution. Some key methods include:

- `count()`: Returns the total number of documents in the result set.
- `limit(n)`: Limits the number of documents retrieved to `n`.
- `skip(n)`: Skips the first `n` documents in the result set.
- `sort(field, order)`: Sorts the documents based on the specified field and order (1 for ascending, -1 for descending).
- `project(field)`: Specifies the fields to include or exclude from the result documents.

You can chain these methods together to build complex queries:

```javascript
const cursor = db
  .collection('myCollection')
  .find({ age: { $gt: 25 } })
  .sort('name', 1)
  .limit(10)
  .skip(20)
  .project({ name: 1, _id: 0 });
```

In this example, the cursor retrieves the first ten documents of people older than 25 years, sorts them by name in ascending order, skips the first twenty documents, and returns only the `name` field.

## Closing Cursors

Cursors automatically close when all documents in the result set have been retrieved or after 10 minutes of inactivity. However, in some cases, you may want to manually close a cursor. To do this, you can use the `close()` method:

```javascript
cursor.close();
```

This method is particularly useful when working with large result sets or when you want to explicitly manage resources.

In summary, cursors are essential tools for working with MongoDB, as they provide an efficient way to handle large volumes of data by iterating through documents in batches. Leveraging cursor methods can help you optimize the performance and resource usage of your application.
