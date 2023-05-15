# MongoDB Aggregation

MongoDB Aggregation framework provides a way to process and transform data that is stored in our MongoDB collections. It allows you to perform calculations and return the calculated results using various data aggregation tools such as aggregation pipelines, map-reduce functions, or single-purpose aggregation methods.

**Here is a brief summary of MongoDB Aggregation:**

## Aggregation Pipeline

The aggregation pipeline is a framework in MongoDB that enables the developers to execute a series of data transformations on the documents in a collection. The pipeline consists of multiple stages, and each stage applies a specific operation on the input documents. Among these operations, you can find features like filtering, sorting, projecting, and grouping.

Example of a simple aggregation pipeline:

```javascript
db.collection.aggregate([
  { $match: { status: 'A' } },
  { $group: { _id: '$cust_id', total: { $sum: '$amount' } } },
  { $sort: { total: -1 } },
]);
```

## Map-Reduce

Map-Reduce is another method to aggregate data in MongoDB. It involves defining a map function to extract data from the input documents, which emits key-value pairs. A reduce function combines the emitted data by keys and optionally a finalize function to further process the results.

Example of a simple map-reduce function:

```javascript
db.collection.mapReduce(
  function () {
    emit(this.cust_id, this.amount);
  },
  function (key, values) {
    return Array.sum(values);
  },
  {
    query: { status: 'A' },
    out: 'order_totals',
  }
);
```

## Single-Purpose Aggregation

MongoDB also supports single-purpose aggregation methods, such as `db.collection.count()`, `db.collection.distinct()`, and `db.collection.group()` etc. These methods offer a faster and more convenient way to perform simple aggregations directly.

Example of db.collection.count():

```javascript
db.collection.count({ status: 'A' });
```

In conclusion, MongoDB Aggregation is a powerful feature that helps you extract, manipulate and aggregate data from your collections. By using aggregation pipelines, map-reduce functions or single-purpose aggregation methods, you can perform various data analysis tasks efficiently on your MongoDB dataset.
