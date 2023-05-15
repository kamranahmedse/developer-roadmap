# $nin

The `$nin` (Not In) operator is used to filter documents where the value of a field is not in a specified array. It selects the documents where the field value is either not in the specified array or the field does not exist.

## Syntax

To use the `$nin` operator in a query, you can use the following syntax:

```javascript
{ field: { $nin: [<value1>, <value2>, ..., <valueN>] } }
```

`<field>` is the name of the field you want to apply the `$nin` condition on, and `<value1>, <value2>, ..., <valueN>` are the values that the field should not have.

## Example

Suppose you have a `books` collection with documents containing `title` and `genre` fields, and you want to find books that are **not** in the genres 'Mystery', 'Sci-Fi', or 'Thriller'. You can use the `$nin` operator like this:

```javascript
db.books.find({ genre: { $nin: ['Mystery', 'Sci-Fi', 'Thriller'] } });
```

This query will return all documents where the `genre` field is not one of the specified values or the field does not exist.

## Conclusion

In summary, the `$nin` operator is a powerful tool that allows you to filter documents based on the absence of specific values in an array. By incorporating `$nin` into your MongoDB queries, you can effectively narrow down your search and retrieve the desired documents more efficiently.
