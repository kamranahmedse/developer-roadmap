# EVALSHA

The `EVALSHA` command in Redis is used to execute a Lua script that has already been loaded into the server with the `SCRIPT LOAD` command. Instead of sending the entire script each time, you provide the SHA1 hash of the script, which allows for more efficient execution and reduced network overhead. Like `EVAL`, `EVALSHA` can accept keys and arguments, enabling complex, atomic operations to be performed directly on the server. This approach is particularly beneficial in scenarios where the same script is executed multiple times, as it avoids the need to re-transmit the script’s source code.

Learn more from the following resources:

- [@official@EVALSHA Documentation](https://redis.io/docs/latest/commands/evalsha/)
- [@article@Redis EVALSHA Command](https://www.tutorialspoint.com/redis/scripting_evalsha.htm)