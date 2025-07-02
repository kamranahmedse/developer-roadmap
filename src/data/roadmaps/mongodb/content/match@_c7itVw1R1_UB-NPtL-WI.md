# $match

The `$match` aggregation stage filters documents in the pipeline, similar to the find() query operation. It should be placed early in the pipeline to reduce document count and improve performance. `$match` supports all query operators and can use indexes when positioned at the beginning of the pipeline, making it essential for efficient data filtering in aggregation workflows.

Visit the following resources to learn more:

- [@official@\$match](https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/)
- [@official@Aggregation Operators](https://www.mongodb.com/docs/manual/reference/operator/aggregation/)
- [@article@How to use match inside lookup in Mongo Aggregation](https://medium.com/@arashramy/how-to-use-match-inside-lookup-in-mongo-aggregation-2431a8920ec6)