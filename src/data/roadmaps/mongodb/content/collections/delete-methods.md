# deleteOne() and others

When working with MongoDB, you will often need to delete documents or even entire collections to manage and maintain your database effectively. MongoDB provides several methods to remove documents from a collection, allowing for flexibility in how you choose to manage your data. In this section, we will explore key delete methods in MongoDB and provide examples for each.

## db.collection.deleteOne()

The `deleteOne()` method is used to delete a single document from a collection. It requires specifying a filter that selects the document(s) to be deleted. If multiple documents match the provided filter, only the first one (by natural order) will be deleted.

Syntax: `db.collection.deleteOne(FILTER)`

Example:

```javascript
db.users.deleteOne({ firstName: 'John' });
```

This command will delete the first `users` document found with a `firstName` field equal to `"John"`.

## db.collection.deleteMany()

The `deleteMany()` method is used to remove multiple documents from a collection. Similar to `deleteOne()`, it requires specifying a filter to select the documents to be removed. The difference is that all documents matching the provided filter will be removed.

Syntax: `db.collection.deleteMany(FILTER)`

Example:

```javascript
db.users.deleteMany({ country: 'Australia' });
```

This command will delete all `users` documents with a `country` field equal to `"Australia"`.

## db.collection.drop()

In cases where you want to remove an entire collection, including the documents and the metadata, you can use the `drop()` method. This command does not require a filter, as it removes everything in the specified collection.

Syntax: `db.collection.drop()`

Example:

```javascript
db.users.drop();
```

This command would delete the entire `users` collection and all related data.

It's important to note that these methods will remove the affected documents permanently from the database, so use caution when executing delete commands. Keep in mind to keep backups or use version control to maintain data integrity throughout the lifecycle of your MongoDB database.
