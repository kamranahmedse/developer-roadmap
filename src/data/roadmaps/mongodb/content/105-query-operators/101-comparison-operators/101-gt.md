# $gt

The `$gt` operator in MongoDB is used to filter documents based on the values of a particular field being _greater than_ the specified value. This operator is handy when you want to retrieve documents that fulfill a condition where a field's value is more than a given value.

The general syntax for querying using the `$gt` operator is:

```javascript
{
  field: {
    $gt: value;
  }
}
```

Here, we need to replace the `field` with the actual field name in the document, and `value` with the desired value you want to compare against.

## Example

Consider a `students` collection where each document contains information about a student, including their `first_name`, `last_name`, and `age`.

If you want to find all the students whose ages are greater than 21, you would use a query with the `$gt` operator as follows:

```javascript
db.students.find({ age: { $gt: 21 } });
```

This query will return all the documents in the `students` collection where the `age` field has a value greater than 21.

Keep in mind that the `$gt` operator can also be used with non-numeric data types, such as date values. The comparison will be made based on their natural order.
