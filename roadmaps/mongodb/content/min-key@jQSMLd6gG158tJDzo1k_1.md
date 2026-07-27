# Min Key

MinKey is a special value in MongoDB that represents the lowest possible value for a field. It is considered to be less than all other values in the database. This makes MinKey useful in queries and sorting operations where you want to establish a lower bound. For instance, when searching for documents with a field that is greater than a certain value, you can use MinKey to ensure that all documents are included, as it effectively acts as the smallest possible value.

Visit the following resources to learn more:

- [@official@Multikey Indexes](https://www.mongodb.com/docs/manual/core/indexes/index-types/index-multikey/)
- [@article@MinKey Class](https://mongodb.github.io/node-mongodb-native/4.2/classes/MinKey.html)
- [@article@MongoDB max() and min() Example](https://examples.javacodegeeks.com/software-development/mongodb/mongodb-max-and-min-example/)