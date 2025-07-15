# $slice

The `$slice` projection operator in MongoDB returns a subset of array elements from documents. It supports positive values for elements from the beginning, negative values from the end, and skip/limit combinations for pagination within arrays. `$slice` is essential for managing large arrays in documents, implementing array pagination, and reducing network traffic by returning only required array portions.

Visit the following resources to learn more:

- [@official@\$slice](https://www.mongodb.com/docs/manual/reference/operator/aggregation/slice/)
- [@article@MongoDB slice - Syntax & Examples](https://database.guide/mongodb-slice/)
