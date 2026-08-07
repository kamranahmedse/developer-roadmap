# PFMERGE

`PFMERGE` is a Redis command used to combine multiple HyperLogLog data structures into a single HyperLogLog key, creating a new structure that represents the union of all unique elements. This command is useful when you want to aggregate and estimate the cardinality of distinct elements across multiple datasets. The resulting HyperLogLog can then be queried using `PFCOUNT` to get the approximate count of the merged unique elements.

Visit the following resources to learn more:

- [@official@PFMERGE](https://redis.io/docs/latest/commands/pfmerge/)