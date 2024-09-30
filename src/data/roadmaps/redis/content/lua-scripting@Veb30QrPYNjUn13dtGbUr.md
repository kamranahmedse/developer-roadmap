# Lua Scripting

Lua scripting in Redis allows users to execute custom scripts atomically on the server side, enabling complex operations to be performed in a single step. Lua scripts are run using the `EVAL` or `EVALSHA` commands, and can manipulate multiple keys and values in a single execution. This reduces network overhead and ensures data consistency, as the script executes as a single transaction. Lua is commonly used for tasks like conditional updates, batch processing, and combining multiple commands into a single operation, enhancing Redis's flexibility and power for advanced use cases.

Learn more from the following resources:

