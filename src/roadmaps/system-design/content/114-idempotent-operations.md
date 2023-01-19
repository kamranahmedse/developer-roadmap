# Idempotent Operations

Idempotent operations are operations that can be applied multiple times without changing the result beyond the initial application. In other words, if an operation is idempotent, it will have the same effect whether it is executed once or multiple times.

For example, consider an HTTP PUT request to update a resource. If the request is idempotent, it will have the same effect whether it is executed once or multiple times, regardless of the state of the resource. In contrast, a non-idempotent operation such as an HTTP POST request, which creates a new resource, will have a different effect each time it is executed.

Idempotent operations are useful in distributed systems, where network failures and other errors may cause the same operation to be executed multiple times. Idempotent operations can help to ensure that the system remains in a consistent state, even in the face of these types of errors.

Examples of idempotent operations are:

- HTTP GET requests
- HTTP PUT requests that update a resource to a specific state
- Database operations such as SELECT statements

Examples of non-idempotent operations are:

- HTTP POST requests that create a new resource
- HTTP DELETE requests
- Database operations that modify data such as INSERT, UPDATE, DELETE.

To learn more, visit the following links:

- [What is an idempotent operation?](https://stackoverflow.com/questions/1077412/what-is-an-idempotent-operation)
- [Overview of Idempotent Operation](https://www.baeldung.com/cs/idempotent-operations)