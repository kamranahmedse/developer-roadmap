# $skip

The `$skip` operator is a useful tool for paginating query results or skipping over a specified number of documents in a collection. This operator can be applied in the aggregation pipeline using the `skip()` method.

In the following example, we will demonstrate how to use the `$skip` operator:

```javascript
db.collection.aggregate([
  {
    $skip: <number>
  }
]);
```

Here, `<number>` is the number of documents you want to skip in the collection.

## Example

Let's say we have a collection named `employees` and we want to skip the first 5 documents of the collection (e.g., for paginating results). We can do this using the `$skip` operator:

```javascript
db.employees.aggregate([
  {
    $skip: 5,
  },
]);
```

## Important Notes

- The `$skip` operator does not guarantee the order of documents passed through, so it's recommended you use `$sort` before `$skip` when order matters.
- For better performance, consider combining `$skip` with additional filters, and placing it later in the pipeline.
