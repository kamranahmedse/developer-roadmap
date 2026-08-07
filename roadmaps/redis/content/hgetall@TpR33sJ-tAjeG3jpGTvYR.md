# HGETALL

`HGETALL` is a Redis command that retrieves all the fields and their values from a specified hash. It returns the data as an array of field-value pairs, making it useful for obtaining a complete view of the hash's contents. However, it can be memory-intensive for large hashes, so it’s recommended to use it cautiously when dealing with high data volumes.

Visit the following resources to learn more:

- [@official@HGETALL](https://redis.io/docs/latest/commands/hgetall/)