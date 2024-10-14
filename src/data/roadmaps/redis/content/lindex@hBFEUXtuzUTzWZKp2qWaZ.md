# LINDEX

`LINDEX` is a Redis command used to retrieve an element from a list by its index. The index can be positive (starting from 0 for the first element) or negative (e.g., -1 for the last element). If the index is out of range, the command returns `nil`. This command is useful for accessing specific elements in a list without needing to fetch the entire list, making it efficient for operations where only certain elements are needed.

Learn more from the following resources:

- [@official@LINDEX Documentation](https://redis.io/docs/latest/commands/lindex/)