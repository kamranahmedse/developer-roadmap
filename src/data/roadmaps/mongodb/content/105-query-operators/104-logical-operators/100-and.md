# $and

The `$and` operator is a logical operator in MongoDB that allows you to combine multiple query statements and returns a result only when all of those conditions are met. With `$and`, you can join together as many query conditions as necessary.

## Syntax

Here's the basic syntax for using the `$and` operator:

```javascript
{ $and: [{ expression1 }, { expression2 }, ... ] }
```

## Example

Suppose we have a collection named `orders` with the following documents:

```json
{ "_id": 1, "item": "apple", "price": 1, "quantity": 5 }
{ "_id": 2, "item": "banana", "price": 1, "quantity": 10 }
{ "_id": 3, "item": "orange", "price": 2, "quantity": 5 }
{ "_id": 4, "item": "mango", "price": 3, "quantity": 15 }
```

If we want to find all the documents with a `price` greater than 1 and `quantity` less than 10, we use the `$and` operator as follows:

```javascript
db.orders.find({ $and: [{ price: { $gt: 1 } }, { quantity: { $lt: 10 } }] });
```

This query returns the following result:

```json
{ "_id": 3, "item": "orange", "price": 2, "quantity": 5 }
```

Keep in mind that using `$and` is only necessary when you have multiple conditions on the same field or you want to enforce a specific order for applying the conditions. Otherwise, you can use the standard query syntax like the following:

```javascript
db.orders.find({ price: { $gt: 1 }, quantity: { $lt: 10 } });
```

This query will also return the same result as the `$and` example above.
