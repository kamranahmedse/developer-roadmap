# $lt

In MongoDB, the `$lt` operator is used to filter documents where the value of a specified field is less than the provided value. This operator compares the specified field value with the provided one and returns documents that satisfy the "less than" condition. The `$lt` operator can be used with various data types like numbers, strings, and dates.

Here's a brief description of the syntax and usage of the `$lt` operator:

## Syntax

```javascript
{
  field: {
    $lt: value;
  }
}
```

## Usage

For instance, let's assume you have a collection named `products` with the following documents:

```javascript
[
  { _id: 1, name: 'Laptop', price: 1000 },
  { _id: 2, name: 'Smartphone', price: 600 },
  { _id: 3, name: 'Tablet', price: 300 },
  { _id: 4, name: 'Smartwatch', price: 200 },
];
```

To find all products with a price less than 500, you can use the following query:

```javascript
db.products.find({ price: { $lt: 500 } });
```

This query will return the following documents:

```javascript
[
  { _id: 3, name: 'Tablet', price: 300 },
  { _id: 4, name: 'Smartwatch', price: 200 },
];
```

In this example, the query checks for documents where the `price` field has a value less than 500 and returns the matching documents from the `products` collection.
