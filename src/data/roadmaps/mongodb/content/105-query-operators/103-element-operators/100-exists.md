# $exists

The `$exists` operator in MongoDB is one of the essential element operators used to filter documents in queries. This operator allows you to search documents in a collection based on the presence or absence of a field, regardless of its value.

## Syntax

```javascript
{ field: { $exists: <boolean> } }
```

Here, `<boolean>` can be either `true` or `false`. If `true`, then it filters the documents containing the specified field, and if `false`, it filters the documents not containing the specified field.

## Examples

- Find all documents where the field "author" exists:

```javascript
db.books.find({ author: { $exists: true } });
```

- Find all documents where the field "publisher" does not exist:

```javascript
db.books.find({ publisher: { $exists: false } });
```

## Usage with Embedded Documents

`$exists` also works perfectly with embedded documents or arrays when searching for the presence or absence of specific fields.

**Example:**

Find all documents where the field "address.city" is present.

```javascript
db.users.find({ 'address.city': { $exists: true } });
```

## Note

Keep in mind that `$exists` checks for both the presence of a field and `null` values since they represent the existence of a field with no value. If you want to search for fields with non-null values, you can use a combination of `$exists` and `$ne` (not equal to) operator.

**Example:**

Find all documents where the field "edition" exists and has a non-null value.

```javascript
db.books.find({ edition: { $exists: true, $ne: null } });
```

That's all you need to know about `$exists` in MongoDB! Happy querying!
