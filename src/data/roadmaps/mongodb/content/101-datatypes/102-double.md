# Double

As a NoSQL database, MongoDB supports a wide range of data types that make it highly versatile for various data storage needs. In this section, we will focus on Double data type.

## Double

A Double in MongoDB is a 64-bit floating-point number used to store numerical values that require high precision. This data type is suitable for situations where fractional values or very large numbers are needed (e.g., decimal numbers, scientific calculations, etc.).

Here's a quick example:

```javascript
{
    "_id" : ObjectId("5d5c361494341a5f5c529cdc"),
    "name" : "Pi",
    "value" : 3.141592653589793
}
```

In actual usage, if you try to store a number with a decimal part, MongoDB will save it as a Double. In the example above, the value of Pi is stored as a Double.

Keep in mind that very large numbers, with or without a decimal part, could also be stored as Double.

## BSON.Double

In MongoDB, Double data type is represented as BSON.Double - BSON being the binary serialization format that MongoDB uses to store documents in a binary format (which is also more space-efficient).

When querying the stored data, you can explicitly cast the value as a Double:

```javascript
db.my_collection.find({ value: { $type: 'double' } });
```

It's important to always remember that although MongoDB provides flexibility in terms of storage, it is crucial to understand the impact of using various data types on performance and storage efficiency.

That's all you need to know about the Double data type in MongoDB. Now, you can store numerical values with high precision.

In the next section, we will cover another data type in MongoDB.
