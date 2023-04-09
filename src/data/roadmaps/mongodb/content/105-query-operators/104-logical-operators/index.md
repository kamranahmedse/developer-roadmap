# Logical Operators

In MongoDB, logical operators are used to filter the results of queries based on multiple conditions. These operators provide flexibility to perform complex comparisons and create more sophisticated queries. The key logical operators in MongoDB are:

- `$and`: Matches for documents where all the specified conditions are true.
- `$or`: Matches for documents where at least one of the specified conditions is true.
- `$not`: Matches for documents where the specified condition is false.
- `$nor`: Matches for documents where none of the specified conditions are true.

Below is a brief explanation of each operator along with examples.

## $and

The `$and` operator is used to combine multiple conditions in a query, and will only return documents where all the conditions are met. The syntax is as follows:

```javascript
{ $and: [ { condition1 }, { condition2 }, ... ] }
```

**Example:**

```javascript
db.collection_name.find({ $and: [{ key1: value1 }, { key2: value2 }] });
```

In this example, only documents that have both `key1` as `value1` and `key2` as `value2` would be returned.

## $or

The `$or` operator is used to return documents where at least one of the specified conditions is true. The syntax is as follows:

```javascript
{ $or: [ { condition1 }, { condition2 }, ... ] }
```

**Example:**

```javascript
db.collection_name.find({ $or: [{ key1: value1 }, { key2: value2 }] });
```

In this example, documents that have either `key1` as `value1` or `key2` as `value2` would be returned.

## $not

The `$not` operator is used to negate a condition, so only documents where the specified condition is not true will be returned. The syntax is as follows:

```javascript
{
  key: {
    $not: {
      operator_expression;
    }
  }
}
```

**Example:**

```javascript
db.collection_name.find({ key1: { $not: { $eq: value1 } } });
```

In this example, only documents where `key1` is not equal to `value1` would be returned.

## $nor

The `$nor` operator is used to return documents where none of the specified conditions are true. The syntax is as follows:

```javascript
{ $nor: [ { condition1 }, { condition2 }, ... ] }
```

**Example:**

```javascript
db.collection_name.find({ $nor: [{ key1: value1 }, { key2: value2 }] });
```

In this example, only documents where `key1` is not equal to `value1` and `key2` is not equal to `value2` would be returned.
