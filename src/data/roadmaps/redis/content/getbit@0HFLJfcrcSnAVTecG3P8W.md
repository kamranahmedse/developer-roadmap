# GETBIT

The `GETBIT` command in Redis retrieves the value of a specific bit at a given offset in a string key. It returns either 0 or 1, depending on the state of the bit at that position. If the key does not exist, the command returns 0, as it treats non-existing keys as empty strings. This command is particularly useful for working with bitmap data structures, allowing you to check the status of individual bits in a more efficient manner compared to retrieving the entire string.

Learn more from the following resources:

- [@official@GETBIT](https://redis.io/docs/latest/commands/getbit/)
