# update() and relevant

In MongoDB, update methods are used to modify the existing documents of a collection. They allow you to perform updates on specific fields or the entire document, depending on the query criteria provided. Here is a summary of the most commonly used update methods in MongoDB:

- **updateOne()**: This method updates the first document that matches the query criteria provided. The syntax for updateOne is:

  ```javascript
  db.collection.updateOne(<filter>, <update>, <options>)
  ```

  - `<filter>`: Specifies the criteria for selecting the document to update.
  - `<update>`: Specifies the modifications to apply to the selected document.
  - `<options>`: (Optional) Additional options to configure the behavior of the update operation.

- **updateMany()**: This method updates multiple documents that match the query criteria provided. The syntax for updateMany is:

  ```javascript
  db.collection.updateMany(<filter>, <update>, <options>)
  ```

  - `<filter>`: Specifies the criteria for selecting the documents to update.
  - `<update>`: Specifies the modifications to apply to the selected documents.
  - `<options>`: (Optional) Additional options to configure the behavior of the update operation.

- **replaceOne()**: This method replaces a document that matches the query criteria with a new document. The syntax for replaceOne is:
  ```javascript
  db.collection.replaceOne(<filter>, <replacement>, <options>)
  ```
  - `<filter>`: Specifies the criteria for selecting the document to replace.
  - `<replacement>`: The new document that will replace the matched document.
  - `<options>`: (Optional) Additional options to configure the behavior of the replace operation.

## Update Operators

MongoDB provides additional update operators to specify the modifications like `$set`, `$unset`, `$inc`, `$push`, `$pull`, and more. Here are a few examples:

- Use `$set` operator to update the value of a field:

  ```javascript
  db.collection.updateOne({ name: 'John Doe' }, { $set: { age: 30 } });
  ```

- Use `$inc` operator to increment the value of a field:

  ```javascript
  db.collection.updateMany({ status: 'new' }, { $inc: { views: 1 } });
  ```

- Use `$push` operator to add an item to an array field:
  ```javascript
  db.collection.updateOne({ name: 'Jane Doe' }, { $push: { tags: 'mongodb' } });
  ```

Remember to thoroughly test your update operations to ensure the modifications are done correctly, and always backup your data before making any substantial changes to your documents.
