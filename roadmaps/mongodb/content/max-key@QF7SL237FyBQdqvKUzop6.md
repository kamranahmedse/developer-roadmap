# Max Key

MaxKey is the counterpart to MinKey in MongoDB, representing the highest possible value for a field. It is considered to be greater than all other values in the database. MaxKey is particularly useful in scenarios where you need to set an upper bound in queries or sorting operations. For example, when looking for documents with a field that is less than a certain value, using MaxKey allows you to include all documents, as it acts as the largest possible value.

Visit the following resources to learn more:

- [@official@Multikey Indexes](https://www.mongodb.com/docs/manual/core/indexes/index-types/index-multikey/)
- [@article@MaxKey Class](https://mongodb.github.io/node-mongodb-native/4.2/classes/MaxKey.html)
- [@article@MongoDB max() and min() Example](https://examples.javacodegeeks.com/software-development/mongodb/mongodb-max-and-min-example/)