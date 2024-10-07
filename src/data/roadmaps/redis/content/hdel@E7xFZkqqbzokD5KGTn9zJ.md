# HDEL

`HDEL` is a Redis command used to delete one or more specified fields from a hash. If the fields exist in the hash, they are removed, and the command returns the number of fields that were deleted. If a specified field does not exist, it is ignored. `HDEL` is useful for efficiently managing memory and cleaning up data within a Redis hash without removing the entire hash structure.

Learn more from the following resources:

- [@official@HDEL Documentation](https://redis.io/docs/latest/commands/hdel/)