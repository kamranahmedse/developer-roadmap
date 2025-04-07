# $sum

The `$sum` operator is a powerful and commonly-used operator in MongoDB, which is primarily utilized in conjunction with the `$group` stage in the aggregation pipeline. As the name suggests, it allows you to calculate the sum of the numeric values in either specified fields or by evaluating expression values for each input document.

## Syntax

The basic syntax for using the `$sum` operator is as follows:

```javascript
{ $sum: <expression> }
```

The `<expression>` can be a field, a number value, or another operator that returns a numeric value.

## Examples

## Calculate Sum of Field Values

Suppose you have a collection of `orders` and you want to calculate the total revenue. You can use the `$sum` operator in combination with the `$group` stage to achieve this:

```javascript
db.orders.aggregate([
  {
    $group: {
      _id: null,
      totalRevenue: { $sum: '$price' },
    },
  },
]);
```

## Calculate Sum with Expression

You can also use the `$sum` operator with an expression to perform more complex calculations. For example, if your `orders` collection has a `quantity` field and you want to calculate the total quantity of items sold, you can use the following aggregation:

```javascript
db.orders.aggregate([
  {
    $group: {
      _id: null,
      totalQuantity: { $sum: { $multiply: ['$price', '$quantity'] } },
    },
  },
]);
```

In this example, the `$multiply` operator is used to calculate the total price for each order, and then `$sum` adds up those values to return the total quantity.

## Caveats

It's important to note that the `$sum` operator only works with numeric values. In case a non-numeric value is encountered, the `$sum` operator will return `null`. To prevent this, you can use the `$ifNull` or `$cond` operators to handle non-numeric values in your expression.

## Conclusion

The `$sum` operator is a versatile and essential tool in the aggregation pipeline. By allowing you to calculate the sum of field values or expressions, it helps you efficiently perform aggregate calculations for your MongoDB data.
