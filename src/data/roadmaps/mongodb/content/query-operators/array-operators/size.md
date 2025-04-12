# $size

The `$size` operator in MongoDB is a powerful tool for querying and filtering documents based on the size of an array field. This operator lets you find documents with array fields containing an exact number of elements. It is used within the `$elemMatch` operator, which allows for matching documents where an array field contains elements that satisfy a set of specified conditions.

Here's a brief summary of how to work with the `$size` operator:

**Syntax:**

```javascript
{ "<array_field>": { "$size": <numer_of_elements> } }
```

**Example:**

Assume we have a collection called `products` with documents containing an attribute `colors` which is an array type.

```javascript
db.products.find({ colors: { $size: 5 } });
```

This query will return all documents in the `products` collection that have exactly 5 elements in the `colors` array field.

**Important notes:**

- Keep in mind that the `$size` operator only matches exact array sizes. If you need more flexible array length comparison, you may consider using `$expr` with `$size` in the aggregation framework.

- The `$size` operator does not require the creation of an additional index to work efficiently. It can leverage existing indexes on an array field.

For more information and examples, refer to the [MongoDB documentation on `$size`.](https://docs.mongodb.com/manual/reference/operator/query/size/)
