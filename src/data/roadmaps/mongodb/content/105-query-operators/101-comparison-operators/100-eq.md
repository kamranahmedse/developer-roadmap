# $eq

The `$eq` (equal) operator in MongoDB is used for comparison operations. It compares two values, and if they are equal, the result is `true`. Otherwise, the result is `false`.

The `$eq` operator can be used in queries to filter documents based on a specific field's value. It can also be used in aggregations where you can determine whether two fields' values or expressions are equal.

## Usage

In a query, the `$eq` operator can be used as follows:

```javascript
db.collection.find({ field: { $eq: value } });
```

For example, if you have a collection named `products` and you want to find all documents where the `price` field is equal to `100`, you can use the `$eq` operator like this:

```javascript
db.products.find({ price: { $eq: 100 } });
```

### Usage in Aggregations

In an aggregation pipeline, the `$eq` operator can be used within the `$project`, `$match`, `$addFields`, and other stages with expressions. For example, if you want to add a field "discounted" to the documents based on whether the `price` field is equal to `50`, you can use the `$eq` operator like this:

```javascript
db.products.aggregate([
  {
    $addFields: {
      discounted: {
        $eq: ['$price', 50],
      },
    },
  },
]);
```

This will add a new field named "discounted" with a `true` or `false` value based on whether the `price` field is equal to `50`.

In conclusion, the `$eq` operator is a helpful tool in MongoDB for performing equality checks and filtering documents based on matching values in queries and aggregations.
