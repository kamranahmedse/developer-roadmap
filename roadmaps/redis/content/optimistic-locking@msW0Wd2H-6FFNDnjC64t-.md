# Optimistic Locking

Optimistic locking in Redis is implemented using the `WATCH` command in combination with transactions (`MULTI` and `EXEC`). `WATCH` monitors specified keys for changes before starting a transaction. If any of the watched keys are modified by another client before `EXEC` is called, the transaction is aborted, and `EXEC` returns `nil` instead of executing the queued commands. This allows Redis to handle concurrent updates without requiring traditional locks, making it ideal for scenarios where multiple clients might modify the same keys. Optimistic locking helps maintain data integrity while minimizing the performance overhead typically associated with locking mechanisms.

Learn more from the following resources:

- [@official@Optimistic Locking using CHECK & SET](https://redis.io/docs/latest/develop/interact/transactions/#optimistic-locking-using-check-and-set)
- [@official@WATCH Command](https://redis.io/docs/latest/commands/watch/)
- [@official@MULTI Command](https://redis.io/docs/latest/commands/multi/)