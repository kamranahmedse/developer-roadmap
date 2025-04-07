# $gte

The Greater Than or Equal To Operator (`$gte`) in MongoDB is an essential comparison operator. It compares two values and returns `true` if the first value is greater than or equal to the second value. It is highly useful for filtering documents based on specific criteria in your queries.

## Syntax

The syntax for using the `$gte` operator is:

```javascript
{
  field: {
    $gte: value;
  }
}
```

Where `field` is the name of the field being compared, and `value` is the comparison value.

## Example

Let's explore an example using the `$gte` operator. Assume we have a collection `products` with the following documents:

```javascript
[
  { _id: 1, product: 'A', price: 10 },
  { _id: 2, product: 'B', price: 20 },
  { _id: 3, product: 'C', price: 30 },
  { _id: 4, product: 'D', price: 40 },
  { _id: 5, product: 'E', price: 50 },
];
```

To find all documents where `price` is greater than or equal to `20`, you can use the following query:

```javascript
db.products.find({ price: { $gte: 20 } });
```

The output will be:

```javascript
[
  { _id: 2, product: 'B', price: 20 },
  { _id: 3, product: 'C', price: 30 },
  { _id: 4, product: 'D', price: 40 },
  { _id: 5, product: 'E', price: 50 },
];
```

As we can see, the `$gte` operator successfully filtered the documents based on the specified criteria. This operator is extremely helpful when you need to narrow down your search or filter documents depending on certain conditions, making it a valuable addition to the toolbox of any MongoDB developer.
