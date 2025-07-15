# Creating Indexes

Creating indexes in MongoDB uses the `createIndex()` method to build data structures that improve query performance. Indexes can be created on single fields, multiple fields (compound), or with special types like text, geospatial, or hashed. Best practices include analyzing query patterns, creating indexes before large data imports, and monitoring index usage to ensure optimal performance without over-indexing.

Visit the following resources to learn more:

- [@official@createIndex](https://www.mongodb.com/docs/manual/reference/method/db.collection.createindex/)
- [@official@Geospatial Queries](https://www.mongodb.com/docs/manual/geospatial-queries/)
- [@article@Single vs Compound Mongodb Index](https://medium.com/@rakeebnazar/single-vs-compound-mongodb-index-in-depth-analysis-5319cfdd2ce)