# Expiration

Redis key expiration allows you to set a time-to-live (TTL) for keys, automatically deleting them after a specified duration. This can be achieved using commands like `EXPIRE`, which sets the expiration time in seconds, or `PEXPIRE`, which uses milliseconds for finer granularity. You can also use `SET` with the EX argument to set a key with a value and expiration in a single command. Expired keys are removed during normal operations, such as when accessed or during periodic cleanup. This feature is useful for managing memory efficiently and for scenarios like session management or caching where temporary data storage is needed.

Learn more from the following resources:

- [@official@PEXPIRE](https://redis.io/docs/latest/commands/pexpire/)
- [@official@EXPIRE](https://redis.io/docs/latest/commands/expire/)