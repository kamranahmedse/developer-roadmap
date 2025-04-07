# $all

The `$all` operator is used to match arrays that contain all specified elements. This allows you to filter documents based on multiple values in a single array field.

## Syntax

The basic syntax for using the `$all` operator is:

```javascript
{
  <field>: {
    $all: [<value1>, <value2>, ..., <valueN>]
  }
}
```

Here, `<field>` refers to the name of the array field that should be queried, and `<value1>, <value2>, ..., <valueN>` are the values that you want to match against.

## Example

Let's assume we have a collection `movies` with documents containing the following fields: `_id`, `title`, and `tags`. The `tags` field is an array of string values.

Here is an example document from the `movies` collection:

```javascript
{
  _id: 1,
  title: "The Matrix",
  tags: ["action", "sci-fi", "cyberpunk"]
}
```

If you want to find all movies with the tags "action" and "sci-fi", you can use the `$all` operator as shown below:

```javascript
db.movies.find({ tags: { $all: ['action', 'sci-fi'] } });
```

This query would return all documents where the `tags` array contains **both** "action" and "sci-fi" values.

## Summary

The `$all` operator allows you to match documents based on the presence of multiple values in an array field. It provides a simple and powerful way to query for documents that meet specific criteria within arrays.
