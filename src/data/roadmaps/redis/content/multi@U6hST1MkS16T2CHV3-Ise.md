# MULTI

`MULTI` is a Redis command used to start a transaction, allowing a group of commands to be executed sequentially and atomically. After initiating a `MULTI` block, commands are queued instead of being executed immediately. Once all desired commands are added, the `EXEC` command is called to run them as a single atomic operation. If an error occurs in any command during queuing, it can be discarded using `DISCARD`. `MULTI` ensures that no other clients can interfere with the transaction, making it ideal for complex operations that require consistent state updates.

Learn more from the following resources:

- [@official@MULTI Command](https://redis.io/docs/latest/commands/multi/)