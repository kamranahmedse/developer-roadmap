# Min Key

In this section, we will discuss the "Min Key" data type in MongoDB. It represents the lowest possible BSON value in the sorting order, making it useful when you need to compare values across documents.

## What is Min Key?

Min Key is a unique data type in MongoDB that is used to represent the smallest value possible when performing sorting operations. It is often used in queries or schema design when you need to ensure that a specific field has the lowest possible value compared to other BSON types.

## How to use Min Key

To use Min Key in MongoDB, you can utilize the `MinKey()` function. Here's an example demonstrating how to insert a document with Min Key data type:

```javascript
// Import the MinKey class from the BSON module
const { MinKey } = require('bson');

// Create an instance of the MinKey class
const minValue = new MinKey();

// Insert a document with a field `priority` having the MinKey value
db.myCollection.insertOne({ name: 'example', priority: minValue });
```

This will insert a document with a `priority` field set to the Min Key value.

## Use cases

- As a default value on a field when you want to ensure that it will always have the lowest possible value for sorting purposes.

```javascript
// Example schema with a field default set to MinKey
const mySchema = new Schema({
  name: String,
  priority: { type: Schema.Types.MinKey, default: new MinKey() },
});
```

- When you need to find a document with the minimum value for a specific field.

```javascript
// Find the document with the lowest priority
db.myCollection.find().sort({ priority: 1 }).limit(1);
```

## Conclusion

In this section, we've learned about the "Min Key" data type in MongoDB. We discussed how it is used to represent the smallest value in the BSON data types and its various use cases in sorting and querying the data.
