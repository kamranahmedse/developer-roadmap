# PFMERGE

`PFMERGE` is a Redis command used to combine multiple HyperLogLog data structures into a single HyperLogLog key, creating a new structure that represents the union of all unique elements. This command is useful when you want to aggregate and estimate the cardinality of distinct elements across multiple datasets. The resulting HyperLogLog can then be queried using `PFCOUNT` to get the approximate count of the merged unique elements.

Learn more from the following resources:

- [@official@PFMERGE Documentation](https://redis.io/docs/latest/commands/pfmerge/)