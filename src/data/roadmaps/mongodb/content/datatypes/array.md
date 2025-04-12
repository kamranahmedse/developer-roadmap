# Array

In this section, we will discuss the `Array` datatype in MongoDB. Arrays are used to store multiple values in a single field of a MongoDB document. Arrays can contain values of different data types, including strings, numbers, dates, objects, and other embedded arrays.

## Why use Arrays?

Arrays are useful when you want to store multiple related items as part of a single document. For example, you might have a list of tags for a blog post or the ingredients for a recipe. Using arrays simplifies querying the data, as you can easily search for documents that contain a specific item in an array or match several items at once.

## Creating Arrays

To create an array in MongoDB, simply include it as a field in a document using the square bracket notation (`[]`). You can add values to the array while creating the document or update it later with new items.

Example of creating an array in a document:

```javascript
{
  "_id": ObjectId("123xyz"),
  "name": "John Doe",
  "hobbies": ["reading", "swimming", "coding"]
}
```

## Querying Arrays

MongoDB provides various operators such as `$in`, `$all`, and `$size`, for querying documents with arrays. The following are some examples:

- Finding documents with a specific item in an array:

```javascript
db.collection.find({ hobbies: 'swimming' });
```

- Finding documents with any of the specified items in an array:

```javascript
db.collection.find({ hobbies: { $in: ['swimming', 'coding'] } });
```

- Finding documents with all specified items in an array:

```javascript
db.collection.find({ hobbies: { $all: ['reading', 'coding'] } });
```

- Finding documents with a specific array size:

```javascript
db.collection.find({ hobbies: { $size: 3 } });
```

## Updating Arrays

You can update documents containing arrays by using operators like `$push`, `$addToSet`, `$pull`, and `$pop`.

- Adding a new item to an array:

```javascript
db.collection.updateOne(
  { _id: ObjectId('123xyz') },
  { $push: { hobbies: 'painting' } }
);
```

- Adding unique items to an array:

```javascript
db.collection.updateOne(
  { _id: ObjectId('123xyz') },
  { $addToSet: { hobbies: 'painting' } }
);
```

- Removing an item from an array:

```javascript
db.collection.updateOne(
  { _id: ObjectId('123xyz') },
  { $pull: { hobbies: 'reading' } }
);
```

- Removing the first or last item from an array:

```javascript
// Remove the first item (use $pop with -1)
db.collection.updateOne({ _id: ObjectId('123xyz') }, { $pop: { hobbies: -1 } });

// Remove the last item (use $pop with 1)
db.collection.updateOne({ _id: ObjectId('123xyz') }, { $pop: { hobbies: 1 } });
```

In this section, we've covered the essentials of using the `Array` datatype in MongoDB. With this knowledge, you can efficiently model and query data that requires multiple related items within a single document.
