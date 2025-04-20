# EVAL

The `EVAL` command in Redis allows the execution of Lua scripts directly on the server, enabling complex operations that can be atomically executed. This command takes a Lua script as an argument, along with a list of keys and arguments for the script. By executing scripts server-side, `EVAL` reduces the number of round trips between the client and server, enhances performance, and allows for operations that require multiple commands to be executed in a single atomic operation. It is particularly useful for implementing advanced data manipulations, custom logic, or conditional operations within Redis.

Learn more from the following resources:

- [@official@EVAL](https://redis.io/docs/latest/commands/eval/)
- [@article@Redis EVAL Command](https://www.tutorialspoint.com/redis/scripting_eval.htm)