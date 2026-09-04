# Circuit Breaker
 
The circuit breaker pattern monitors calls to a remote service or resource and stops sending requests once failures cross a certain threshold, similar to an electrical circuit breaker tripping to prevent damage. While open, it fails fast instead of waiting on a service that is likely to fail anyway, and it periodically tests whether the service has recovered before resuming normal traffic. This prevents a failing dependency from slowing down or crashing the calling system.

Visit the following resources to learn more:

- [@article@Circuit breaker design pattern](https://en.wikipedia.org/wiki/Circuit_breaker_design_pattern)
- [@article@Overview of Circuit Breaker](https://medium.com/geekculture/design-patterns-for-microservices-circuit-breaker-pattern-276249ffab33)