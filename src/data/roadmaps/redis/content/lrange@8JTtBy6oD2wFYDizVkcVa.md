# LRANGE

`LRANGE` is a Redis command that retrieves a specified range of elements from a list, defined by a start and stop index. The indices can be positive (starting from 0) or negative (e.g., -1 for the last element). This command is commonly used to fetch subsets of a list without loading the entire list into memory, making it useful for paginating data, viewing portions of a queue, or analyzing a segment of ordered data in an efficient manner.

Learn more from the following resources:

- [@official@LRANGE](https://redis.io/docs/latest/commands/lrange/)