# Decimal128

`Decimal128` is a high-precision 128-bit decimal-based floating-point data type in MongoDB. It provides greater precision and a larger range for storing decimal numbers compared to other common floating-point data types like `Double`.

## Key Features

- **Precision**: Decimal128 allows for precise storage of decimal numbers with up to 34 decimal points, making it suitable for financial and scientific applications where exact calculations are crucial.
- **Range**: Decimal128 supports a wide range of values, ranging from -10^6145 to 10^6145, as well as the smallest non-zero positive and negative numbers around ±10^-6143.
- **IEEE 754-2008 compliant**: Decimal128 follows the decimal floating-point arithmetic encoding set by the IEEE 754-2008 international standard, ensuring consistent and accurate results across diverse platforms and systems.

## Usage

To specify a `Decimal128` value in MongoDB, use the `$numberDecimal` keyword followed by the decimal value enclosed in quotes. Here's an example demonstrating the insertion of a decimal128 data type:

```javascript
db.example.insertOne({
  amount: {
    $numberDecimal: '1234.567890123456789012345678901234',
  },
});
```

Alternatively, with the help of the JavaScript BSON library, you can use the `Decimal128.fromString()` function to create a Decimal128 value from a string:

```javascript
const { Decimal128 } = require('bson');

const decimalValue = Decimal128.fromString(
  '1234.567890123456789012345678901234'
);
db.example.insertOne({ amount: decimalValue });
```

## Considerations

- When querying decimal values, note that MongoDB compares decimal numbers using their mathematical values, rather than their string representation.
- Due to the high precision of the `Decimal128` data type, you may encounter rounding differences between MongoDB and other systems or libraries when performing calculations involving mixed data types. To mitigate this, ensure that all operands are converted to the same data type (preferably, `Decimal128`) before performing calculations.
