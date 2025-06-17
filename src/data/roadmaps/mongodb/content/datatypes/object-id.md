# ObjectId

Object ID is a unique identifier in MongoDB and one of its primary datatypes. It is the default identifier created by MongoDB when you insert a document into a collection without specifying an `_id`.

## Structure of an Object ID

An Object ID consists of 12 bytes, where:

- The first 4 bytes represent the timestamp of the document's creation in seconds since the Unix epoch.
- The next 3 bytes contain a unique identifier of the machine where the document was created, usually calculated using its hostname.
- Following that, 2 bytes represent the process ID of the system where the document was created.
- The last 3 bytes are a counter that starts from a random value, incremented for each new document created.

## Benefits of Object ID

- The generation of the Object ID is unique, ensuring that no two documents have the same `_id` value in a collection.
- The structure of the Object ID provides important information about the document's creation, such as when and where it was created.
- The Object ID enables efficient indexing and high performance in large-scale MongoDB deployments.

## Working with Object ID

Here are a few examples of how to work with Object IDs in MongoDB:

**1. Inserting a document without specifying an `_id`:**

```javascript
db.collection.insertOne({ title: 'Example' });
```

**Output:**

```javascript
{
  "_id": ObjectId("60c4237a89293ddc1ef23245"),
  "title": "Example"
}
```

**2. Creating Object ID manually:**

```javascript
const { ObjectId } = require('mongodb');
const objectId = new ObjectId();
```

**3. Converting Object ID to a string:**

```javascript
const objectIdStr = objectId.toString();
```

**4. Converting a string back to an Object ID:**

```javascript
const objectIdFromStr = ObjectId(objectIdStr);
```

## Conclusion

The Object ID datatype in MongoDB is a very powerful and efficient way to uniquely identify documents in a collection. Its structure provides valuable information about the document's creation, and its design ensures high performance and scalability for large-scale MongoDB deployments. Understanding and effectively utilizing Object IDs is essential for successful MongoDB usage.
