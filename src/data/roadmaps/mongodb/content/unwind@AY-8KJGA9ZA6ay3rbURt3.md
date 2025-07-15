# $unwind

The `$unwind` aggregation stage deconstructs array fields, creating separate documents for each array element. It's essential for processing documents with embedded arrays by flattening them into individual records. `$unwind` supports options for preserving null/empty arrays and including array indices, enabling detailed analysis of array-based data structures and normalization workflows.

Visit the following resources to learn more:

- [@official@\$unwind](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unwind/)
- [@article@Advanced Techniques with MongoDB: Mastering Lookup](https://medium.com/@akshatgupta1903/advanced-techniques-with-mongodb-mastering-lookup-and-unwind-acfc8a8ad5b9)
