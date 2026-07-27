# Counting Documents

Counting documents in MongoDB uses methods like `countDocuments()` for accurate filtered counts and `estimatedDocumentCount()` for fast approximate totals. `countDocuments()` supports query filters and provides precise results but may be slower on large collections. `estimatedDocumentCount()` uses collection metadata for rapid estimates, making it ideal for dashboard metrics and quick statistics.

Visit the following resources to learn more:

- [@official@Counting Documents](https://www.mongodb.com/docs/manual/reference/method/db.collection.countdocuments/)
- [@official@estimatedDocumentCount](https://www.mongodb.com/docs/manual/reference/method/db.collection.estimateddocumentcount/)