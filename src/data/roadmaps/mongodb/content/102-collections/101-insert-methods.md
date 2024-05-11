# insert() and relevant

In MongoDB, collections are used to store documents. To add data into these collections, MongoDB provides two primary insertion methods: `insertOne()` and `insertMany()`. In this section, we'll explore the usage and syntax of these methods, along with their options and some basic examples.

## insertOne()

The `insertOne()` method is used to insert a single document into a collection. This method returns an `InsertOneResult` object, that shows the outcome of the operation.

**Syntax:**

```javascript
db.collection.insertOne(
   <document>,
   {
      writeConcern: <document>,
      ordered: <boolean>,
      bypassDocumentValidation: <boolean>,
      comment: <any>
   }
)
```

**Options:**

- `writeConcern:` An optional document specifying the level of acknowledgment requested from MongoDB for the write operation.
- `ordered:` An optional boolean flag. When set to `true`, MongoDB will return an error if it encounters a duplicate document in the operation. Default is also `true`.
- `bypassDocumentValidation:` Optional boolean flag. To validate or not to validate the document against the collection's validation rules. Default is `false`.
- `comment:` An optional string or BSON that can be used for descriptive purposes when profiling operations.

**Example:**

```javascript
db.inventory.insertOne({
  item: 'book',
  qty: 1,
});
```

## insertMany()

The `insertMany()` method is used to insert multiple documents into a collection at once. It returns an `InsertManyResult` object, displaying the status of the operation.

**Syntax:**

```javascript
db.collection.insertMany(
   [ <document_1>, <document_2>, ... ],
   {
      writeConcern: <document>,
      ordered: <boolean>,
      bypassDocumentValidation: <boolean>,
      comment: <any>
   }
)
```

**Options:**

- `writeConcern:` Same as mentioned in `insertOne()` method.
- `ordered:` Same as mentioned in `insertOne()` method. When set to `true`, MongoDB will insert the documents in the array's order. If a fail occurs, it will stop further processing of the documents. Default is `true`.
- `bypassDocumentValidation:` Same as mentioned in `insertOne()` method.
- `comment:` Same as mentioned in `insertOne()` method.

**Example:**

```javascript
db.inventory.insertMany([
  { item: 'pen', qty: 5 },
  { item: 'pencil', qty: 10 },
  { item: 'notebook', qty: 25 },
]);
```

In conclusion, insert methods in MongoDB allow users to add documents to a collection with a few simple commands. By understanding the syntax and options available for `insertOne()` and `insertMany()`, we can efficiently store and manage data within MongoDB collections.
