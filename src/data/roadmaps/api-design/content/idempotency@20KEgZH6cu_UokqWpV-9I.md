# Idempotency in API Design

Idempotency in API design refers to the concept where multiple identical requests have the same effect as a single request. This means that no matter how many times a client sends the same request to the server, the server's state stays the same after the first request. Designing APIs to be idempotent is essential for reliability, as it allows retries without side-effects, reduces complexity in distributed systems, and provides better user experience in unstable network conditions. Understanding idempotency concepts can increase the robustness and fault tolerance of your APIs. It is usually applicable to `PUT`, `DELETE`, and sometimes `POST` methods in RESTful APIs.

Learn more from the following resources:

- [@article@What is idempotency?](https://blog.dreamfactory.com/what-is-idempotency)
- [@article@Idempotent REST API](https://restfulapi.net/idempotent-rest-apis/)