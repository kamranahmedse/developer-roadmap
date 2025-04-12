# Primary Keys / Secondary Indexes

DynamoDB supports two types of primary keys, namely `Partition Key` and `Composite Key` (Partition Key and Sort Key). A `Partition Key`, also known as a hash key, is a simple primary key that has a scalar value (a string, a number, or a binary blob). DynamoDB uses the partition key's value to distribute data across multiple partitions for scalable performance. A `Composite Key` consists of two attributes. The first attribute is the partition key, and the second attribute is the sort key. DynamoDB uses the partition key to spread data across partitions and also uses the sort key to store items in sorted order within those partitions. This sort key provides further granular control over data organization.

Visit the following resources to learn more:

- [@official@Primary Keys / Secondary Indexes](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SecondaryIndexes.html)
