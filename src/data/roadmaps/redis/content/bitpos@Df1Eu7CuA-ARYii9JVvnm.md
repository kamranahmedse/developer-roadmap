# BITPOS

The `BITPOS` command in Redis is used to find the position of the first bit set to 1 or 0 in a string key. You can specify a starting and ending byte range for the search. It’s commonly used in scenarios where you need to quickly locate specific bits within a bitmap, such as finding the first occurrence of a flag or status in large datasets.

Learn more from the following resources:

- [@official@BITPOS](https://redis.io/docs/latest/commands/bitpos/)
- [@article@BITPOS Documentation](https://upstash.com/docs/redis/sdks/py/commands/bitmap/bitpos)