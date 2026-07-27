# DECR

The `DECR` command in Redis decreases the integer value of a key by 1. If the key does not exist, it is initialized to 0 before performing the decrement. If the key contains a value that is not an integer, Redis returns an error. This command is useful in counters and for tracking state changes in a simple, atomic way.

Learn more from the following resources:

- [@official@DECR Documentation](https://redis.io/docs/latest/commands/decr/)
- [@article@Redis String DECR](https://www.w3resource.com/redis/redis-decr-key.php)