# $elemMatch

`$elemMatch` is an array operator in MongoDB that is used to select documents that contain an array field with at least one element matching the specified query criteria. This is useful in situations when you need to match multiple criteria within the same array element.

## Usage

To use `$elemMatch`, you need to include it in your query with the syntax `{ <field>: { $elemMatch: { <query> } } }`.

- `<field>`: The name of the array field for which you want to apply the `$elemMatch` operator.
- `<query>`: A document containing the query conditions to be matched against the elements in the array.

## Example

Let's say you have a collection named `courseRecords` containing the following documents:

```json
{
  "_id": 1,
  "student": "Mary",
  "grades": [ { "subject": "Math", "score": 80 }, { "subject": "English", "score": 75 } ]
}

{
  "_id": 2,
  "student": "Tom",
  "grades": [ { "subject": "Math", "score": 90 }, { "subject": "English", "score": 80 } ]
}

{
  "_id": 3,
  "student": "John",
  "grades": [ { "subject": "Math", "score": 85 }, { "subject": "English", "score": 65 } ]
}
```

If you want to find all the students who have scored 80 or above in Math and 70 or above in English, you can use `$elemMatch` as follows:

```javascript
db.courseRecords.find({
  grades: {
    $elemMatch: {
      subject: 'Math',
      score: { $gte: 80 },
      subject: 'English',
      score: { $gte: 70 },
    },
  },
});
```

This would return the records for Mary and Tom.

## Further Reading

For more advanced uses of `$elemMatch` and additional examples, you can refer to the [official MongoDB documentation](https://docs.mongodb.com/manual/reference/operator/query/elemMatch/).
