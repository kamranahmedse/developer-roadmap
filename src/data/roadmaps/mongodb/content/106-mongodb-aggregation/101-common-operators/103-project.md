# $project

The `$project` operator helps in selecting or controlling the fields in a document by passing only the necessary attributes to the next stage in the pipeline.

```javascript
db.collection.aggregate([
  {
    $project:
      {
        field1: <1 or 0>,
        field2: <1 or 0>,
        ...
      }
  }
])
```

The value `1` or `0` in the syntax represents whether the field should be included or excluded, respectively.

Let's assume we have the following documents in a `students` collection:

```json
[
  { "_id": 1, "name": "John Doe", "age": 20, "subjects": ["Math", "Physics"] },
  {
    "_id": 2,
    "name": "Jane Smith",
    "age": 23,
    "subjects": ["Chemistry", "Biology"]
  }
]
```

We can use the `$project` operator to include only the name and age fields, excluding the subjects:

```javascript
db.students.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      age: 1,
    },
  },
]);
```

Returned documents:

```json
[
  { "name": "John Doe", "age": 20 },
  { "name": "Jane Smith", "age": 23 }
]
```

Notice that the resulting documents do not include the "\_id" and "subjects" fields.

In the example below, we'll exclude the "subjects" field:

```javascript
db.students.aggregate([
  {
    $project: {
      subjects: 0,
    },
  },
]);
```

Returned documents:

```json
[
  { "_id": 1, "name": "John Doe", "age": 20 },
  { "_id": 2, "name": "Jane Smith", "age": 23 }
]
```

Now that you have a basic understanding of the `$project` operator, you can try it out with various scenarios to reshape your MongoDB documents according to your needs. This operator can also be used in conjunction with other operators to perform complex data manipulations within the aggregation pipeline.
