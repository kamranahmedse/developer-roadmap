# $include

The `$include` projection operator in MongoDB allows you to explicitly specify which fields should be included in query results, providing precise control over the data returned from the database. When using `$include` (or simply setting fields to 1 or true in a projection document), only the specified fields and the _id field (unless explicitly excluded) will be present in the returned documents, which helps reduce network traffic, improve query performance, and enhance security by limiting data exposure. This operator is essential for optimizing applications that only need specific fields from large documents, especially in scenarios where documents contain many fields or large nested objects that would unnecessarily consume bandwidth and processing resources.

Visit the following resources to learn more:

- [@official@Project Fields to Return from Query](https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/)
- [@official@\$include](https://www.mongodb.com/docs/manual/core/indexes/index-types/index-wildcard/create-wildcard-index-multiple-fields/)
