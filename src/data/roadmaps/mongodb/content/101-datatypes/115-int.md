# Int32 / Int

In MongoDB, the `int` (short for integer) data type is used for storing whole numbers without a fractional component. Integers can be either positive or negative and are commonly used in scenarios requiring counting or ranking, such as user's ages, product quantity, or the number of upvotes.

## Overview

In MongoDB, integers can be represented in different sizes depending on the range of values required for a specific application. These sizes are as follows:

- `Int32`: Represents 32-bit integer values between -2^31 and 2^31-1.
- `Int64`: Represents 64-bit integer values between -2^63 and 2^63-1.

By default, MongoDB uses 64-bit integers (`Int64`) when storing integer values for greater flexibility in accommodating various value ranges. However, you can also choose to use 32-bit integers (`Int32`) for smaller value ranges if necessary.

## Usage

To store an integer value in a MongoDB document, you can simply include the integer as the value for a field within the document. For example:

```javascript
{
  "name": "John Doe",
  "age": 30,
  "upvotes": 150
}
```

Here, `age` and `upvotes` are both integer values representing the age and the number of upvotes of a user.

If you specifically need to store an integer as a 32-bit or 64-bit value, you can use a driver-specific method or construct BSON objects using the appropriate BSON data type for integers. For example, in the Node.js MongoDB driver, you can use the `Int32` and `Long` constructors from the `mongodb` package:

```javascript
const { Int32, Long } = require('mongodb');

const myInt32 = new Int32(42); // Creates a 32-bit integer
const myInt64 = new Long(9007199254740991); // Creates a 64-bit integer
```

Remember that choosing the appropriate integer size can help optimize storage and performance within your MongoDB application. Use `Int32` for smaller value ranges and `Int64` for larger value ranges as needed.
