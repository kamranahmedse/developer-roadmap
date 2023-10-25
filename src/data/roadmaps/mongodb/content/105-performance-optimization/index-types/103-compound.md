# Compound

A compound index is a type of index in MongoDB that allows you to specify multiple fields in a single index, effectively creating an index on the combined values of those fields. This type of index can support queries that involve multiple fields, allowing you to optimize the performance of your queries and efficiently search through large datasets.

## Structure

To create a compound index, you specify each field and its corresponding sort order (ascending/descending) as an object:

```javascript
{
    field1: <sort order>,
    field2: <sort order>,
    ...
}
```

For example, to create a compound index on the `author` field in ascending order and the `title` field in descending order, you would use:

```javascript
{
  author: 1,
  title: -1
}
```

## Usage

When using a compound index, consider the following:

- **Prefixes**: A compound index can support queries on any of its "prefixes", which are subsets of its fields starting from the left. For example, if a collection has a compound index `{ author: 1, title: -1 }`, it can support queries on both the `author` field and the combined `author` and `title` fields.

- **Sort Order**: The sort order of fields in the compound index can affect query performance. In general, choose the sort order based on your application's query patterns.

- **Covered Queries**: A compound index can also be used to perform "covered queries", where all the fields of the query are part of the index. In such a case, MongoDB can satisfy the query using only the index, without the need to access the actual documents, resulting in improved performance.

## Example

Suppose you have a collection named `books` with the following documents:

```javascript
{ "_id" : ObjectId("..."), "author" : "John Smith", "title" : "Introduction to MongoDB", "year" : 2020 }
{ "_id" : ObjectId("..."), "author" : "Jane Doe", "title" : "Advanced MongoDB", "year" : 2021 }
{ "_id" : ObjectId("..."), "author" : "John Smith", "title" : "MongoDB for Experts", "year" : 2021 }
```

You can create a compound index on the `author` and `title` fields using the following command:

```javascript
db.books.createIndex({ author: 1, title: 1 });
```

With the compound index in place, MongoDB can efficiently execute queries involving both the `author` and `title` fields. For example, the following query would benefit from the compound index:

```javascript
db.books.find({ author: 'John Smith', title: 'Introduction to MongoDB' });
```

In addition, the query could use the index for sorting results:

```javascript
db.books.find({ author: 'John Smith' }).sort({ title: 1 });
```

In summary, compound indexes provide a powerful optimization tool for queries involving multiple fields, allowing MongoDB to execute searches more efficiently and improve overall performance.
