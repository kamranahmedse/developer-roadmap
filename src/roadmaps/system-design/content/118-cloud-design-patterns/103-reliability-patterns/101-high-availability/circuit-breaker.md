# Circuit Breaker

Circuit Breaker in system design is a pattern that is used to prevent an application from repeatedly trying to perform an action that is likely to fail. By tripping the circuit breaker when an operation fails a certain number of times, the system can prevent cascading failures, provide fallback behavior, and monitor system health. It can be implemented in several different ways such as State machine, and Hystrix (library for Java).

Learn more from the following links:

- [Circuit breaker design pattern](https://en.wikipedia.org/wiki/Circuit_breaker_design_pattern)
- [Overview of Circuit Breaker](https://medium.com/geekculture/design-patterns-for-microservices-circuit-breaker-pattern-276249ffab33)