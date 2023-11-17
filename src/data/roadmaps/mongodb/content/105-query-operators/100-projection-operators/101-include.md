# $include

The `$include` projection operator is used in queries to specify the fields that should be returned in the result documents. By using `$include`, you can choose to retrieve only fields of interest, making your query more efficient by minimizing the amount of data returned.

The syntax for `$include` is as follows:

```javascript
{
  field: 1;
}
```

Here, `field` is the name of the field to include, and `1` indicates that you want the field included in the result documents. You can include multiple fields by specifying them in a comma-separated list:

```javascript
{ field1: 1, field2: 1, field3: 1 }
```

## Example

Suppose we have a collection called `books` with the following documents:

```javascript
[
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    year: 1951,
    genre: 'Literary fiction',
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: 1960,
    genre: 'Southern Gothic',
  },
  {
    title: 'Of Mice and Men',
    author: 'John Steinbeck',
    year: 1937,
    genre: 'Novella',
  },
];
```

If you want to retrieve only the `title` and `author` fields from the documents in the `books` collection, you can use the `$include` projection operator as follows:

```javascript
db.books.find({}, { title: 1, author: 1, _id: 0 });
```

The result will be:

```javascript
[
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
  },
  {
    title: 'Of Mice and Men',
    author: 'John Steinbeck',
  },
];
```

Note that we have also excluded the `_id` field (which is included by default) by setting it to `0`.

Keep in mind that you cannot combine `$include` and `$exclude` (or `1` and `0`) in the same query, except for the `_id` field, which can be excluded even when other fields are being included.
