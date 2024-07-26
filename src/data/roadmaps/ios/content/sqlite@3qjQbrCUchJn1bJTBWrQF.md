# SQLite

SQLite in iOS offers a lightweight, serverless, and self-contained relational database engine that's embedded directly into applications. It provides a robust solution for storing and managing structured data without the overhead of a separate database server. SQLite is particularly useful for apps that need to handle complex queries or manage large datasets efficiently. iOS includes built-in support for SQLite, allowing developers to create, read, update, and delete data using SQL queries. While powerful, working directly with SQLite can be verbose and error-prone, leading many developers to use wrapper libraries or higher-level abstractions like Core Data, which uses SQLite as its default persistent store. SQLite excels in scenarios requiring local data storage with relational capabilities, offering a balance between performance and flexibility. However, it requires careful management of database schemas and queries, making it more complex to use than simpler storage options like User Defaults or property lists.

Learn more from the following resources:

- [@official@SQLite website](https://www.sqlite.org/)
- [@course@SQlite with Swift tutorial](https://www.kodeco.com/6620276-sqlite-with-swift-tutorial-getting-started)
- [@opensource@stephencelis/SQLite.swift](https://github.com/stephencelis/SQLite.swift)