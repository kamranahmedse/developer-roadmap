# ZRANGEBYSCORE

This command retrieves elements from a sorted set stored at the specified key. It returns all elements with scores falling within the given min and max range, inclusive of both boundaries. Elements are ordered from lowest to highest score. For elements sharing the same score, the command returns them in lexicographical order. This ordering is an inherent property of Redis sorted sets and requires no additional computation.

Learn more from the following resources:

- [@official@ZRANGEBYSCORE Documentation](https://redis.io/docs/latest/commands/zrangebyscore/)