# $unwind

The `$unwind` operator is a powerful aggregation pipeline stage in MongoDB that allows you to deconstruct an array field from input documents and generate a new document for each element in the array, essentially "unwinding" the array.

This operator is particularly useful when you have documents containing array fields, and you need to perform operations on the individual elements within those arrays. `$unwind` enables you to flatten the array structure and easily manipulate or analyze data within arrays as separate documents.

## Syntax

The general syntax for the `$unwind` operator is:

```javascript
{
  $unwind: {
    path: <field path>,
    includeArrayIndex: <string>, // Optional
    preserveNullAndEmptyArrays: <boolean> // Optional
  }
}
```

## Parameters

- `path`: A string representing the field path of the array you want to unwind. It must be prefixed with a `$` to indicate referencing a field in the input document.
- `includeArrayIndex`: (Optional) A string representing the field name for the index of the array element. The output documents will include this field, with the value as the index of the element in the original array.
- `preserveNullAndEmptyArrays`: (Optional) A boolean value that determines whether to output a document for input documents that don't have the specified `path` or have an empty array, null, or missing value. By default, these input documents are not included in the output.

## Example

Consider a `sales` collection with the following sample document:

```javascript
{
  _id: 1,
  item: "itemA",
  orders: [
    { quantity: 2, unitPrice: 10 },
    { quantity: 3, unitPrice: 20 },
    { quantity: 1, unitPrice: 15 }
  ]
}
```

If you want to calculate the total revenue for each individual order, you can use the `$unwind` operator to deconstruct the `orders` array:

```javascript
db.sales.aggregate([{ $unwind: { path: '$orders' } }]);
```

The output will be:

```javascript
[
  { _id: 1, item: 'itemA', orders: { quantity: 2, unitPrice: 10 } },
  { _id: 1, item: 'itemA', orders: { quantity: 3, unitPrice: 20 } },
  { _id: 1, item: 'itemA', orders: { quantity: 1, unitPrice: 15 } },
];
```

Now each document represents a single order, and you can easily perform further operations like calculating the revenue for each document.

Remember, the `$unwind` operator is a crucial tool for handling and analyzing array data in MongoDB, enabling you to efficiently work with complex data structures.
