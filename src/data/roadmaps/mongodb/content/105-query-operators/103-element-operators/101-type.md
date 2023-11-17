# $type

The `$type` operator is an element query operator in MongoDB that allows you to select documents based on data types of their fields. This can be useful when you want to perform operations only on those documents that have specific data types for certain fields.

## Syntax

The basic syntax for using the `$type` operator is:

```javascript
{
  fieldName: {
    $type: dataType;
  }
}
```

Here, `fieldName` is the name of the field whose data type you want to check, and `dataType` is the BSON data type or its corresponding alias.

## BSON Data Types and Aliases

MongoDB supports various data types for fields, such as `String`, `Number`, `Date`, etc. Some of the common BSON data types and their corresponding aliases are:

- `Double`: 1 or 'double'
- `String`: 2 or 'string'
- `Object`: 3 or 'object'
- `Array`: 4 or 'array'
- `Binary`: 5 or 'binData'
- `ObjectId`: 7 or 'objectId'
- `Boolean`: 8 or 'bool'
- `Date`: 9 or 'date'
- `Null`: 10 or 'null'
- `Regex`: 11 or 'regex'
- `Int32`: 16 or 'int'
- `Int64`: 18 or 'long'
- `Decimal128`: 19 or 'decimal'

Refer to the [MongoDB documentation](https://docs.mongodb.com/manual/reference/bson-types/) for a comprehensive list of supported BSON data types and their aliases.

## Example

Suppose you have a collection named `products` with different fields like `name`, `price`, and `discount`. You want to find documents that have a `price` field of type `Double`. You can use the `$type` operator like this:

```javascript
db.products.find({ price: { $type: 'double' } });
```

Or use the BSON data type instead of alias:

```javascript
db.products.find({ price: { $type: 1 } });
```

Keep in mind that the `$type` operator will only match documents with the exact data type specified for the field. So, if the field has an integer value, using `$type` with `Double` will not match those documents.

In summary, the `$type` element operator is a useful query tool for selecting documents based on the data types of their fields in MongoDB. By understanding and utilizing the BSON data types and aliases, you can effectively filter documents in your queries based on specific fields' data types.
