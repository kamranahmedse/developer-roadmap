# Data Model and Data Types

In MongoDB, data is stored in BSON format, which supports various data types. Understanding these data types is essential as they play a crucial role in schema design and query performance. The following is a brief summary of the different data types supported in MongoDB.

## ObjectId

`ObjectId` is a 12-byte identifier used as a unique identifier for documents in a collection. It is the default value generated for the `_id` field, ensuring uniqueness within the collection.

## String

`String` is used to store text data. It must be a valid UTF-8 encoded string.

```javascript
{
   "name": "John Doe",
}
```

## Boolean

`Boolean` is used to store true or false values.

```javascript
{
   "isActive": true,
}
```

## Integer

`Integer` is used to store an integer value. MongoDB supports two integer types: 32-bit (`int`) and 64-bit (`long`).

```javascript
{
   "age": 28,
}
```

## Double

`Double` is used to store floating-point numbers.

```javascript
{
   "price": 12.99,
}
```

## Date

`Date` is used to store the date and time in Unix time format (milliseconds timestamp since January 1, 1970, 00:00:00 UTC).

```javascript
{
   "createdAt": ISODate("2019-02-18T19:29:22.381Z"),
}
```

## Array

`Array` is used to store a list of values in a single field. The values can be of different data types.

```javascript
{
   "tags": ["mongodb", "database", "noSQL"],
}
```

## Object

`Object` is used to store embedded documents, meaning a document can contain another document.

```javascript
{
   "address": { "street": "123 Main St", "city": "San Francisco", "state": "CA" },
}
```

## Null

`Null` is used to store a null value, representing the absence of a value or the field.

```javascript
{
   "middleName": null,
}
```

## Binary Data

`Binary Data` is used to store binary data or byte arrays.

```javascript
{
   "data": BinData(0, "c3VyZS4="),
}
```

## Code

`Code` is used to store JavaScript code.

```javascript
{
   "script": Code("function() { return 'Hello, World!'; }"),
}
```

## Regular Expression

`Regular Expression` is used to store regular expressions.

```javascript
{
   "pattern": /^mongodb/i,
}
```

Understanding and using the appropriate data types while designing your MongoDB schema can significantly improve the performance, storage, and retrieval of your data. Don't forget to consider the specific use cases of your application when choosing data types.
