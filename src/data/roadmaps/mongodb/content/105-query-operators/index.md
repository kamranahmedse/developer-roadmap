# Query Operators

In this section, we'll be exploring **query operators** in MongoDB. Query operators provide powerful ways to search and manipulate documents in a MongoDB collection. There are several types of query operators, including:

- Comparison Operators
- Logical Operators
- Element Operators
- Evaluation Operators
- Array Operators
- Bitwise Operators

Let's explore each category in more detail.

## Comparison Operators

Comparison operators allow you to compare the value of a field with specified values. Some common comparison operators are:

- `$eq`: Matches values that are equal to the specified value.
- `$gt`: Matches values that are greater than the specified value.
- `$gte`: Matches values that are greater than or equal to the specified value.
- `$lt`: Matches values that are less than the specified value.
- `$lte`: Matches values that are less than or equal to the specified value.
- `$ne`: Matches values that are not equal to the specified value.
- `$in`: Matches values that are in the specified array.
- `$nin`: Matches values that are not in the specified array.

## Logical Operators

Logical operators provide ways to combine multiple query conditions. Some common logical operators include:

- `$and`: Matches documents where all the specified conditions are true.
- `$or`: Matches documents where at least one of the specified conditions is true.
- `$not`: Matches documents where the specified condition is not true.
- `$nor`: Matches documents where none of the specified conditions are true.

## Element Operators

Element operators target specific elements within documents, including:

- `$exists`: Matches documents that have the specified field.
- `$type`: Matches documents where the specified field is of the specified BSON type.

## Evaluation Operators

Evaluation operators perform operations on specific fields and values, such as regular expression searches or checking the size of arrays. Some examples include:

- `$expr`: Allows the use of aggregation expressions within query language.
- `$jsonSchema`: Matches documents that fulfill the specified JSON Schema.
- `$mod`: Matches documents where the specified field has a value divisible by a divisor and equal to a remainder.
- `$regex`: Matches documents where the specified field contains a string that matches the provided regular expression pattern.
- `$text`: Performs text search on the content of indexed fields in the documents.
- `$where`: Matches documents that satisfy a JavaScript expression.

## Array Operators

Array operators are used to query or manipulate documents that contain arrays. Some common array operators include:

- `$all`: Matches documents where an array field contains all specified values.
- `$elemMatch`: Matches documents where an array field contains at least one element that matches the specified conditions.
- `$size`: Matches documents where an array field contains a specified number of elements.

## Bitwise Operators

Bitwise operators allow you to perform bit manipulation on integer values. Some examples are:

- `$bitsAllClear`: Matches documents where all bits of the specified field are clear (0) in the specified bitmask.
- `$bitsAllSet`: Matches documents where all bits of the specified field are set (1) in the specified bitmask.
- `$bitsAnyClear`: Matches documents where any bits of the specified field are clear (0) in the specified bitmask.
- `$bitsAnySet`: Matches documents where any bits of the specified field are set (1) in the specified bitmask.
