# Int64 / Long

Int64 (Long) data type in MongoDB stores 64-bit signed integers with a range from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807. This type handles large integer values that exceed Int32 limits while maintaining exact precision. Long integers are essential for timestamps, large counters, and applications requiring precise integer arithmetic with very large numbers.

Visit the following resources to learn more:

- [@official@Long](https://www.mongodb.com/docs/mongodb-shell/reference/data-types/#long)
- [@article@MongoDB Int64](https://www.tedblob.com/mongodb-query-int64/)
- [@articleIssue with `int64` stored in the field _id](https://www.mongodb.com/community/forums/t/issue-with-int64-stored-in-the-field-id/277905)