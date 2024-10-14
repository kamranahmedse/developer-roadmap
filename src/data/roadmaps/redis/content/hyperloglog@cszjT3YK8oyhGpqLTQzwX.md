# HyperLogLog

HyperLogLog is a probabilistic data structure in Redis used for efficiently estimating the cardinality (i.e., the number of unique elements) of large datasets with minimal memory usage. Instead of storing the actual elements, it maintains a compressed representation, allowing it to estimate cardinality with a typical error rate of only 0.81%. Commands like `PFADD`, `PFCOUNT`, and `PFMERGE` are used to add elements, get the count, and merge HyperLogLogs, respectively. This structure is ideal for applications like unique visitor tracking or counting events where exact counts are not required but low memory consumption is critical.

Learn more from the following resouces:

- [@official@HyperLogLog Documentation](https://redis.io/docs/latest/develop/data-types/probabilistic/hyperloglogs/)
- [@video@Redis HyperLogLog Explained](https://www.youtube.com/watch?v=MunL8nnwscQ)