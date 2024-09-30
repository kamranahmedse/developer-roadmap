# PFMERGE

`PFMERGE` is a Redis command used to combine multiple HyperLogLog data structures into a single HyperLogLog key, creating a new structure that represents the union of all unique elements. This command is useful when you want to aggregate and estimate the cardinality of distinct elements across multiple datasets. The resulting HyperLogLog can then be queried using `PFCOUNT` to get the approximate count of the merged unique elements. `PFMERGE` is highly efficient for combining large sets without significantly increasing memory usage, making it ideal for large-scale analytics and unique element tracking across various sources.

Learn more from the following resources:
