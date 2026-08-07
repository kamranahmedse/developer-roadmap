# PFCOUNT

`PFCOUNT` is a Redis command used to retrieve the estimated number of unique elements in one or more HyperLogLog structures. It provides an approximate cardinality count with a typical error rate of 0.81%, making it highly efficient for large datasets while using minimal memory. When called with multiple HyperLogLog keys, `PFCOUNT` merges the data and returns the approximate count of the union, allowing for quick aggregation of unique elements across multiple sets.

Visit the following resources to learn more:

- [@official@PFCOUNT](https://redis.io/docs/latest/commands/pfcount/)