# $sort

The `$sort` operator is an aggregation operator in MongoDB that sorts the documents that are passed through the pipeline. It takes one or more fields as parameters and sorts the documents in ascending or descending order based on the values in the specified fields.

Here's the syntax for the `$sort` operator:

```javascript
{ $sort: { field1: <sort order>, field2: <sort order>, ... } }
```

The `<sort order>` parameter can be either `1` or `-1`, which corresponds to ascending or descending order, respectively.

For example, suppose we have a collection of documents containing information about books, and we want to sort the documents by the book's title in ascending order. We can use the following `$sort` operator:

```javascript
db.books.aggregate([{ $sort: { title: 1 } }]);
```

This will sort the documents by the `title` field in ascending order.

We can also use the `$sort` operator to sort by multiple fields. For example, suppose we have a collection of documents containing information about students, and we want to sort the documents by the student's age in descending order and then by their name in ascending order. We can use the following `$sort` operator:

```javascript
db.students.aggregate([{ $sort: { age: -1, name: 1 } }]);
```

This will sort the documents by the `age` field in descending order and then by the `name` field in ascending order.

It's important to note that the `$sort` operator can be an expensive operation, especially if sorting large datasets. So it's recommended to use it towards the end of a pipeline to minimize the number of documents being sorted.
