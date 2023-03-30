# MongoDB Basics

MongoDB is a popular NoSQL database system that stores data in Flexible JSON-like documents, making it suitable for working with large scale and unstructured data.

- **Database**: Stores all your collections within a MongoDB instance.
- **Collection**: A group of related documents, similar to a table in a relational database.
- **Document**: A single record within a collection, which is stored as BSON (Binary JSON) format.
- **Field**: A key-value pair within a document.
- **\_id**: A unique identifier automatically generated for each document within a collection.

## Basic Operations

- **Insert**: To insert a single document, use `db.collection.insertOne()`. For inserting multiple documents, use `db.collection.insertMany()`.
- **Find**: Fetch documents from a collection using `db.collection.find()`, and filter the results with query criteria like `{field: value}`. To fetch only one document, use `db.collection.findOne()`.
- **Update**: Update fields or entire documents by using update operators like `$set` and `$unset` with `db.collection.updateOne()` or `db.collection.updateMany()`.
- **Delete**: Remove documents from a collection using `db.collection.deleteOne()` or `db.collection.deleteMany()` with query criteria.
- **Drop**: Permanently delete a collection or a database using `db.collection.drop()` and `db.dropDatabase()`.

## Indexes and Aggregations

- **Indexes**: Improve the performance of searches by creating indexes on fields within a collection using `db.collection.createIndex()` or build compound indexes for querying multiple fields.
- **Aggregations**: Perform complex data processing tasks like filtering, grouping, transforming, and sorting using aggregation operations like `$match`, `$group`, `$project`, and `$sort`.

## Data Modeling

MongoDB's flexible schema allows for various data modeling techniques, including:

- **Embedded Documents**: Store related data together in a single document, which is suitable for one-to-one or one-to-few relationships.
- **Normalization**: Store related data in separate documents with references between them, suitable for one-to-many or many-to-many relationships.
- **Hybrid Approach**: Combine embedded documents and normalization to balance performance and storage needs.

In conclusion, MongoDB's flexible and feature-rich design makes it a powerful choice for modern applications dealing with large scale and unstructured data. Understanding the basics of MongoDB can help you effectively use it as your data storage solution.
