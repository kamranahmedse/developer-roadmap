# MONITOR

`MONITOR` is a Redis command that provides a real-time feed of all commands executed on the server, displaying each command along with its arguments as they are processed. It is primarily used for debugging, monitoring, or analyzing the behavior of a Redis instance. Since `MONITOR` can impact performance by streaming every command in real-time, it should be used cautiously in production environments. It is a useful tool for understanding command patterns, tracking down issues, and gaining insights into how clients interact with the Redis server.

Learn more from the following resources:

- [@official@MONITOR Documentation](https://redis.io/docs/latest/commands/monitor/)
- [@official@SLOWLOG Documentation](https://redis.io/docs/latest/commands/slowlog/)