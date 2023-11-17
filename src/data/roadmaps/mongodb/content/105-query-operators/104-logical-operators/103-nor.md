# $nor

The `$nor` operator in MongoDB is a logical operator used as a filter in queries. It performs a logical NOR operation on an array of one or more filter expressions and returns the documents that fail to match any of the conditions specified in the array. In simple terms, `$nor` selects the documents that do not match the given conditions.

## Syntax

The basic syntax for the `$nor` operator is as follows:

```javascript
{ $nor: [ { <expression1> }, { <expression2> }, ...  { <expressionN> } ] }
```

## Usage

To use the `$nor` operator, you need to specify an array of expressions as its value. Documents that don't satisfy any of these expressions will be returned from the query.

Here's an example:

Suppose you have a `students` collection with the following documents:

```javascript
[
  { _id: 1, name: 'Alice', age: 30, subjects: ['math', 'science'] },
  { _id: 2, name: 'Bob', age: 25, subjects: ['history'] },
  { _id: 3, name: 'Cathy', age: 35, subjects: ['math', 'history'] },
  { _id: 4, name: 'David', age: 28, subjects: ['science'] },
];
```

Now, if you want to find the students that are not older than 30 and not studying math, you would use the following query with `$nor`:

```javascript
db.students.find({
  $nor: [{ age: { $gt: 30 } }, { subjects: 'math' }],
});
```

This will return the following documents:

```javascript
[
  { _id: 2, name: 'Bob', age: 25, subjects: ['history'] },
  { _id: 4, name: 'David', age: 28, subjects: ['science'] },
];
```

As you can see, the query returned only the documents that don't match any of the conditions specified in the `$nor` array.

Keep in mind that only one expression needs to be true for a document to be excluded from the result set. Also, when using the `$nor` operator, it is important to ensure that the array contains at least one filter expression.

Now you know how to use the `$nor` operator in MongoDB to filter documents based on multiple negated conditions. Remember to use it wisely, as it can help you fetch refined data from your collections.
