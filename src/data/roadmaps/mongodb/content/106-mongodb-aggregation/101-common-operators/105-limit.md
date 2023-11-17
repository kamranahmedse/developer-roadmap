# $limit

The $limit operator limits the number of documents passed to the next stage in the pipeline. The $limit operator is useful for debugging and testing pipelines. It is also useful for limiting the number of documents that are returned by a pipeline.

Here's the syntax for the $limit operator:

```javascript
{ $limit: <number> }
```

Here, `<number>` is the number of documents you want to limit the pipeline to.

## Example

Let's say we have a collection named `employees` and we want to limit the number of documents to 5. We can do this using the `$limit` operator:

```javascript
db.employees.aggregate([
  {
    $limit: 5,
  },
]);
```
