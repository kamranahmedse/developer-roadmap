# Expiring

Expiring indexes are a specific index type in MongoDB that allows you to automatically remove documents from a collection after a certain time period or at a specific expiration date. These indexes are particularly useful for managing time-sensitive data, such as session data, cached data, or logs, where the information becomes irrelevant or less valuable after a certain period of time.

To create an expiring index, you can use the `createIndex()` method along with the `expireAfterSeconds` option. This option takes a number of seconds as its value, which represents the duration after which the document should be removed automatically.

Here's an example of creating an expiring index on a `createdAt` field with a time-to-live (TTL) of 3600 seconds (1 hour):

```javascript
db.collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });
```

When using expiring indexes, it's essential to note the following points:

- The field used for the expiring index must be a date or an array of date values. If the field holds an array of dates, MongoDB will expire the document when the earliest date in the array has passed the specified TTL.

- Expiring indexes have no effect on capped collections, as MongoDB does not support the removal of documents in a capped collection.

- The background task that removes expired documents runs every 60 seconds. As a result, there may be a slight delay between the document's expiration time and its actual deletion from the database.

- Expiring indexes can only be single-field indexes, i.e., they cannot be created as part of a compound index or a multi-key index.

In summary, expiring indexes provide an efficient way to manage time-sensitive data in MongoDB by automatically removing documents that have passed a specified time-to-live. This can help to keep your database clean and ensure that irrelevant or outdated data are not retained longer than necessary.
