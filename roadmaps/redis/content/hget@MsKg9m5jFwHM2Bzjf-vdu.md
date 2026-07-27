# HGET

`HGET` is a Redis command used to retrieve the value of a specified field within a hash. If the field exists, it returns the value; if not, it returns `nil`. This command is efficient for accessing specific fields within a hash without retrieving the entire hash structure, making it ideal for scenarios where only selective data needs to be read from a Redis hash.

Learn more from the following resources:

- [@official@HGET](https://redis.io/docs/latest/commands/hget/)