# $ne

In MongoDB, the `$ne` operator is used to filter documents where the value of a specified field is _not equal_ to a specified value.

## Usage

To use the `$ne` comparison operator, include it within the query document as:

```javascript
{
  field: {
    $ne: value;
  }
}
```

- `field` : The field that you want to apply the `$ne` operator on.
- `value` : The value that you want to filter out from the results.

## Example

Let's say you have a collection called `products` with documents like:

```javascript
{ _id: 1, name: "Apple", category: "Fruits" }
{ _id: 2, name: "Banana", category: "Fruits" }
{ _id: 3, name: "Carrot", category: "Vegetables" }
```

If you want to query all documents where the category is _not_ "Fruits", you would execute:

```javascript
db.products.find({ category: { $ne: 'Fruits' } });
```

The result would be:

```javascript
{ "_id" : 3, "name" : "Carrot", "category" : "Vegetables" }
```

## Additional Notes

- The `$ne` operator also works with compound conditions.
- You can compare values of different types (e.g., a string and a number), but remember that MongoDB uses BSON's comparison rules for different data types.

And that's a brief summary of the `$ne` operator. Use it when you want to filter documents where a specified field's value is not equal to another specified value. Happy querying!
