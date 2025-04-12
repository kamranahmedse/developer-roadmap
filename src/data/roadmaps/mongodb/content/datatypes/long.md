# Int64 / Long

The `Long` data type in MongoDB is a 64-bit integer, which is useful when you need to store large integral values beyond the range of the standard `int` (32-bit integer) data type. The range for the `Long` data type is from `-2^63` to `2^63 - 1`. This data type is suitable for applications that require high-precision numerical data, such as analytics and scientific calculations.

## Syntax

To define a field with the `Long` data type in MongoDB, you can use the `$numberLong` keyword. Here's an example of a document with a field named `largeValue` defined as a `Long` data type:

```json
{
  "largeValue": { "$numberLong": "1234567890123456789" }
}
```

## Usage

You can use the `Long` data type to store and query large integral values in your MongoDB collections. To insert a document with a `Long` field, you can use the following syntax:

```javascript
db.collection.insert({
  largeValue: NumberLong('1234567890123456789'),
});
```

To query documents that have a `Long` field with a specific value, you can use the following syntax:

```javascript
db.collection.find({
  largeValue: NumberLong('1234567890123456789'),
});
```

## Considerations

When using the `Long` data type in MongoDB, keep the following considerations in mind:

- JavaScript uses the [IEEE 754 floating-point](https://en.wikipedia.org/wiki/Double-precision_floating-point_format) representation for numbers, which may cause a loss of precision when storing and manipulating large integral values. To avoid this, always manipulate `Long` values using MongoDB's built-in `NumberLong()` function, as shown in the examples above.

- When using the `Long` data type, be aware of the performance trade-offs. Operations on 64-bit integers typically require more processing power and storage space compared to 32-bit integers. If you don't need the extra range provided by the `Long` data type, consider using the `int` data type instead.

- If you need to store extremely large numbers that exceed the range of the `Long` data type, you may want to consider using the [`Decimal128`](https://docs.mongodb.com/manual/reference/bson-types/#decimal128) data type, which provides 128-bit decimal-based floating-point numbers with 34 decimal digits of precision.
