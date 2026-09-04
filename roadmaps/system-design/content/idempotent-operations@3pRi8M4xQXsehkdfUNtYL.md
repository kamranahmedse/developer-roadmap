# Idempotent Operations
 
An idempotent operation produces the same result no matter how many times it is performed with the same input. This property matters in distributed systems because network failures often lead to retries, and an operation that is not idempotent could cause duplicate effects, like charging a customer twice. Designing operations to be idempotent makes retry logic safe.

Visit the following resources to learn more:

- [@article@What is an idempotent operation?](https://stackoverflow.com/questions/1077412/what-is-an-idempotent-operation)
- [@article@Overview of Idempotent Operation](https://www.baeldung.com/cs/idempotent-operations)