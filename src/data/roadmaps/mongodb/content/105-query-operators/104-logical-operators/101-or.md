# $or

The `$or` operator in MongoDB is a logical operator that allows you to perform queries on multiple fields, and return documents that satisfy any of the specified conditions. It is useful when you need to filter data based on one or more criteria.

## Syntax

The syntax for using the `$or` operator is as follows:

```javascript
{
  $or: [
    { condition1 },
    { condition2 },
    // ...,
    { conditionN },
  ];
}
```

## Usage

To use the `$or` operator, you need to specify the conditions inside the `$or` array. Each condition should be an object containing one or more field-value pairs to be matched.

Let's consider a collection named `products` with the following documents:

```javascript
[
  { _id: 1, category: 'Fruits', price: 20 },
  { _id: 2, category: 'Fruits', price: 30 },
  { _id: 3, category: 'Vegetables', price: 10 },
  { _id: 4, category: 'Vegetables', price: 15 },
];
```

If you want to find all the documents where the `category` is "Fruits" or the `price` is less than or equal to `15`, you can use the `$or` operator as shown below:

```javascript
db.products.find({
  $or: [{ category: 'Fruits' }, { price: { $lte: 15 } }],
});
```

The result will include the documents that match either of the conditions:

```javascript
[
  { _id: 1, category: 'Fruits', price: 20 },
  { _id: 2, category: 'Fruits', price: 30 },
  { _id: 3, category: 'Vegetables', price: 10 },
  { _id: 4, category: 'Vegetables', price: 15 },
];
```

## Combination with Other Operators

The `$or` operator can be combined with other MongoDB operators to build more complex queries. For example, if you want to find all the documents where the `category` is "Fruits" and the `price` is either less than `20` or greater than `25`, you can use the `$and` and `$or` operators together:

```javascript
db.products.find({
  $and: [
    { category: 'Fruits' },
    {
      $or: [{ price: { $lt: 20 } }, { price: { $gt: 25 } }],
    },
  ],
});
```

The result will include the documents that match the specified conditions:

```javascript
[{ _id: 2, category: 'Fruits', price: 30 }];
```

And that's an overview of the `$or` logical operator in MongoDB! It enables you to create more flexible queries and fetch the desired documents based on multiple conditions. Use it wisely in conjunction with other operators to get the most out of your MongoDB queries.
