# $group

The `$group` operator in MongoDB is used to aggregate and perform operations on the grouped data. The operator allows you to categorize documents in a collection based on specific fields and perform various operations on each group. These operations range from counting the number of documents in a group, to summing up the values of a particular field, to calculating average values, and many more.

#### Basic Usage

The basic syntax for the `$group` operator is as follows:

```javascript
{
  $group: {
    _id: <expression>,
    <field1>: { <accumulator1> : <expression1> },
    ...
  }
}
```

Here's a quick breakdown of the components:

- `_id`: This field represents the criteria for grouping the documents. It can be a single field name or an expression that returns a value.
- `<field1>`: This is the name of the field you want to create in the resulting documents, which store the computed values from the group.
- `<accumulator1>`: This is one of the [accumulators](https://docs.mongodb.com/manual/reference/operator/aggregation/#grp._S_grp) that MongoDB provides (e.g. `$sum`, `$avg`, `$min`, `$max`, `$push`, etc.). They specify the operation to perform on the grouped data.
- `<expression1>`: This is the field or expression that the `$group` operator applies to the specific accumulator.

Suppose we have a collection called `orders`, which contains documents representing sales data.

```javascript
[
  { _id: 1, customer_id: 'C1', amount: 110 },
  { _id: 2, customer_id: 'C2', amount: 150 },
  { _id: 3, customer_id: 'C1', amount: 90 },
  { _id: 4, customer_id: 'C3', amount: 200 },
  { _id: 5, customer_id: 'C2', amount: 50 },
];
```

Now, let's group the data by `customer_id` and calculate each customer's total spent amount.

```javascript
db.orders.aggregate([
  {
    $group: {
      _id: '$customer_id',
      total_spent: { $sum: '$amount' },
    },
  },
]);
```

This query would result in the following:

```javascript
[
  { _id: 'C1', total_spent: 200 },
  { _id: 'C2', total_spent: 200 },
  { _id: 'C3', total_spent: 200 },
];
```

Using the `$group` operator, documents in the `orders` collection were grouped by `customer_id`, and the total spent amount for each customer was calculated using the `$sum` accumulator.
