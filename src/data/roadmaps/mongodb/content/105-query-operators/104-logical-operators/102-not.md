# $not

In this section, we'll explore the `$not` operator in MongoDB. This handy operator allows us to negate the logical expression or condition applied in a query. It can be especially useful when we want to find documents that don't match a given condition.

## Syntax

Here's the general structure of a query that includes the `$not` operator:

```javascript
{
  field: { $not: { <operator-expression> } }
}
```

The `$not` operator must be associated with a field, followed by the desired operator expression or condition.

## Examples

Let's dive into some examples to better understand how to use the `$not` operator. Suppose we have a collection called `products` containing documents with information about various products.

## Example 1: Simple Usage

```javascript
db.products.find({ price: { $not: { $gt: 100 } } });
```

In this example, we're looking for all products that are **not** greater (`$gt`) than 100 in price. In other words, we want products that have a price of 100 or less.

## Example 2: Combining with Other Operators

```javascript
db.products.find({
  $and: [
    { category: 'Electronics' },
    { price: { $not: { $lt: 50, $gt: 200 } } },
  ],
});
```

This time, we want to find all electronics products (`category: 'Electronics'`) whose price is **not** less than 50 **and** greater than 200. Essentially, this query will return products with a price between 50 and 200.

## Example 3: Using Regular Expressions

```javascript
db.products.find({ name: { $not: /^apple/i } });
```

In our final example, we want to find all products whose name does **not** start with "apple" (case-insensitive). To achieve this, we use `$not` in conjunction with a regular expression (`/^apple/i`).

## Conclusion

Using the `$not` operator in your MongoDB queries can help filter for documents that don't meet specific conditions. Mastery of this powerful operator will allow you to further refine and narrow down your searches, providing better results when working with collections.
