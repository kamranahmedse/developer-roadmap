# Null

In MongoDB, the `null` data type represents a missing value or a field that's purposely set to have no value. This is an important data type when you need to represent the absence of a value in a specific field, for example, when a field is optional in your documents.

## Null in BSON

MongoDB uses BSON (Binary JSON) as its data model for storage. In BSON, the `null` data type is represented by the type number `0x0A`.

## Using Null Values in MongoDB

Here's an example to illustrate how to use the `null` data type in MongoDB:

```javascript
db.users.insertOne({
  name: 'Alice',
  email: 'alice@example.com',
  phone: null,
});
```

In this example, we're inserting a new document into the `users` collection with the name, email, and phone fields. For the phone field, instead of leaving it out, we explicitly set it to `null`, making it clear that Alice might have a phone number, but it's currently unknown.

## Comparison with Null

When comparing values to `null`, MongoDB will use the following rules:

- Equality: `null` is equal to `null`.
- Inequalities: `null` is considered lower than any other value when it comes to inequalities.

Keep in mind that there are cases when a field is missing from a document, it might be considered as having a `null` value (depending on the query).

## Conclusion

In MongoDB, the `null` data type helps you to represent missing values or fields that shouldn't have a defined value. By setting a field to `null`, you can preserve the structure of your documents and improve the readability of your database design.
