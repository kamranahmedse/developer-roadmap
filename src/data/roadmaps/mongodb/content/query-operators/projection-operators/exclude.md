# $exclude

In MongoDB, the projection operators help you to specify the fields you want to include or exclude in the query result. The `exclude` operator, as the name suggests, helps you to exclude certain fields from the result.

To exclude a field from the query result, you need to set its value to `0` in the projection document. Let's understand it better with an example.

## Syntax

```javascript
{
    $project: {
        field1: 0,
        field2: 0
        ...
    }
}
```

Here, we're specifying that the fields `field1` and `field2` should be excluded from the result.

## Example

Suppose we have a collection called `students` with the following documents:

```javascript
{
    "_id": 1,
    "name": "John Doe",
    "age": 20,
    "course": "Software Engineering"
},
{
    "_id": 2,
    "name": "Jane Smith",
    "age": 22,
    "course": "Computer Science"
},
{
    "_id": 3,
    "name": "Richard Roe",
    "age": 21,
    "course": "Information Technology"
}
```

Now, let's say we want to fetch all the students but exclude the `age` field from the result. We can achieve this using the following command:

```javascript
db.students.aggregate([
  {
    $project: {
      age: 0,
    },
  },
]);
```

This command will return the following result:

```javascript
{
    "_id": 1,
    "name": "John Doe",
    "course": "Software Engineering"
},
{
    "_id": 2,
    "name": "Jane Smith",
    "course": "Computer Science"
},
{
    "_id": 3,
    "name": "Richard Roe",
    "course": "Information Technology"
}
```

As you can see, the `age` field is excluded from the result.

Note: You cannot use the `exclude` operator (0) for a field that is explicitly included with the `include` operator (1) in the same document, except for the `_id` field. The `_id` field is the only field that can have both exclude (0) and include (1) options in the same document.
