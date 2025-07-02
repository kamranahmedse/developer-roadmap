# $all

The `$all` operator in MongoDB selects documents where an array field contains all specified elements, regardless of order or additional elements. It's useful for tag-based filtering and ensuring multiple required values exist in arrays. `$all` performs element-wise matching and can work with arrays of different data types, making it essential for multi-criteria array filtering.

Visit the following resources to learn more:

- [@official@\$all](https://www.mongodb.com/docs/manual/reference/operator/query/all/)
- [@article@\$all and \$elemMatch in MongoDB](https://dev.to/kawsarkabir/all-and-elemmatch-in-mongodb-4od6)