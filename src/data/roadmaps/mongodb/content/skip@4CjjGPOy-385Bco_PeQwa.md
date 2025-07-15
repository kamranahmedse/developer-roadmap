# $skip

The `$skip` aggregation stage skips a specified number of documents before passing the remaining documents to the next pipeline stage. It's commonly used with $limit for pagination implementation, allowing applications to skip previous pages and retrieve specific result sets. `$skip `should be used carefully with large skip values as it can impact performance.

Visit the following resources to learn more:

- [@official@\$skip](https://www.mongodb.com/docs/manual/reference/operator/aggregation/skip/)
- [@article@MongoDB Skip Documents - Syntax & Examples ](https://www.tutorialkart.com/mongodb/mongodb-skip-documents/)
