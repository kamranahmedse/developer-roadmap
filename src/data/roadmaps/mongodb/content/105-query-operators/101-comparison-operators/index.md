# Comparison Operators

Comparison operators are used to performing various operations like comparing values or selecting documents based on the comparison. In this section, we'll discuss some of the most commonly used comparison operators in MongoDB.

## `$eq`

The `$eq` operator is used to match documents where the value of a field equals the specified value. The syntax for `$eq` is:

```javascript
{ <field>: { $eq: <value> } }
```

Example:

```javascript
db.collection.find({ age: { $eq: 25 } });
```

This query will return all documents where the `age` field is equal to 25.

## `$ne`

The `$ne` operator is used to match documents where the value of a field is not equal to the specified value. The syntax for `$ne` is:

```javascript
{ <field>: { $ne: <value> } }
```

Example:

```javascript
db.collection.find({ age: { $ne: 25 } });
```

This query will return all documents where the `age` field is not equal to 25.

## `$gt`

The `$gt` operator is used to match documents where the value of a field is greater than the specified value. The syntax for `$gt` is:

```javascript
{ <field>: { $gt: <value> } }
```

Example:

```javascript
db.collection.find({ age: { $gt: 25 } });
```

This query will return all documents where the `age` field is greater than 25.

## `$gte`

The `$gte` operator is used to match documents where the value of a field is greater than or equal to the specified value. The syntax for `$gte` is:

```javascript
{ <field>: { $gte: <value> } }
```

Example:

```javascript
db.collection.find({ age: { $gte: 25 } });
```

This query will return all documents where the `age` field is greater than or equal to 25.

## `$lt`

The `$lt` operator is used to match documents where the value of a field is less than the specified value. The syntax for `$lt` is:

```javascript
{ <field>: { $lt: <value> } }
```

Example:

```javascript
db.collection.find({ age: { $lt: 25 } });
```

This query will return all documents where the `age` field is less than 25.

## `$lte`

The `$lte` operator is used to match documents where the value of a field is less than or equal to the specified value. The syntax for `$lte` is:

```javascript
{ <field>: { $lte: <value> } }
```

Example:

```javascript
db.collection.find({ age: { $lte: 25 } });
```

This query will return all documents where the `age` field is less than or equal to 25.

These comparison operators can help query your data more efficiently and effectively. You can combine them to create complex queries to meet your specific requirements.
