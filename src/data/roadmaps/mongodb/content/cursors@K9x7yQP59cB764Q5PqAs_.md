# Cursors

Cursors in MongoDB are pointers to query result sets that enable efficient iteration through large datasets without loading all documents into memory. They support methods like `hasNext(), next(), forEach(), and limit()` for result manipulation. Cursors automatically handle batching, provide lazy loading of results, and can be configured with timeouts and batch sizes for optimal performance.

Visit the following resources to learn more:

- [@official@Cursors](https://www.mongodb.com/docs/manual/reference/method/js-cursor/)
- [@article@Understanding Cursor in MongoDB](https://medium.com/@satyamguptaece/understanding-cursor-in-mongodb-b8a9e1a8cb0c)