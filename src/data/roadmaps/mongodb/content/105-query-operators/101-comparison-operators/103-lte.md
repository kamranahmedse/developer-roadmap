# $lte

The `$lte` comparison operator matches values that are less than or equal to the specified value. It can be used in queries to filter documents based on the values of a specific field.

### Syntax

To use the `$lte` operator, specify it in the query filter using the following syntax:

```javascript
{
  field: {
    $lte: value;
  }
}
```

### Example

Consider a collection `products` with the following documents:

```json
[
  { "_id": 1, "name": "Product A", "price": 10 },
  { "_id": 2, "name": "Product B", "price": 15 },
  { "_id": 3, "name": "Product C", "price": 20 },
  { "_id": 4, "name": "Product D", "price": 25 }
]
```

To query for products with a price of **15 or less**, use the `$lte` operator as shown below:

```javascript
db.products.find({ price: { $lte: 15 } });
```

This query will return the following documents:

```json
[
  { "_id": 1, "name": "Product A", "price": 10 },
  { "_id": 2, "name": "Product B", "price": 15 }
]
```

Using the `$lte` operator, you can easily filter documents based on numeric, date, or string values. Remember that string comparisons are done based on Unicode code points.

Keep in mind that when comparing different data types, MongoDB uses a type hierarchy for comparisons. You can find more about it in the official documentation: [MongoDB Type Comparison Order](https://docs.mongodb.com/manual/reference/bson-type-comparison-order/).
