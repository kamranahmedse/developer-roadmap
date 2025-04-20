# HSET

`HSET` is a Redis command used to set the value of a specified field within a hash. If the field already exists, it updates the value; if not, it adds the field to the hash. This command is useful for creating and managing key-value pairs within a hash structure without modifying other fields. It returns `1` if a new field is created and `0` if an existing field is updated, making it efficient for atomic updates in a Redis hash.

Learn more from the following resources:

- [@official@HSET](https://redis.io/docs/latest/commands/hset/)