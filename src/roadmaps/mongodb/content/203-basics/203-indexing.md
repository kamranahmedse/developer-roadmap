# Indexing

Indexes support the efficient execution of queries in MongoDB. Without indexes, MongoDB must perform a collection scan, i.e. scan every document in a collection, to select those documents that match the query statement. If an appropriate index exists for a query, MongoDB can use the index to limit the number of documents it must inspect.

Indexes are special data structures that store a small portion of the collection's data set in an easy to traverse form.

* [Indexes](https://www.mongodb.com/docs/manual/indexes/)
* [Indexing Strategies](https://www.mongodb.com/docs/manual/applications/indexes/)
* [The ESR (Equality, Sort, Range) Rule](https://www.mongodb.com/docs/manual/tutorial/equality-sort-range-rule/)

* [Performance Best Practices: Indexing](https://www.mongodb.com/blog/post/performance-best-practices-indexing)
* [MongoDB Indexes](https://learn.mongodb.com/courses/mongodb-indexes)


