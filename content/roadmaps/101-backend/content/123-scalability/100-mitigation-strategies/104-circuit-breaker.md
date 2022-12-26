# Circuit Breaker

The circuit breaker design pattern is a way to protect a system from failures or excessive load by temporarily stopping certain operations if the system is deemed to be in a failed or overloaded state. It is commonly used in cloud computing environments to prevent cascading failures and to improve the resilience and availability of a system.

A circuit breaker consists of three states: closed, open, and half-open. In the closed state, the circuit breaker allows operations to proceed as normal. If the system encounters a failure or becomes overloaded, the circuit breaker moves to the open state, and all subsequent operations are immediately stopped. After a specified period of time, the circuit breaker moves to the half-open state, and a small number of operations are allowed to proceed. If these operations are successful, the circuit breaker moves back to the closed state; if they fail, the circuit breaker moves back to the open state.

The circuit breaker design pattern is useful for protecting a system from failures or excessive load by providing a way to temporarily stop certain operations and allow the system to recover. It is often used in conjunction with other design patterns, such as retries and fallbacks, to provide a more robust and resilient cloud environment.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://aws.amazon.com/architecture/well-architected/serverless/patterns/circuit-breaker/'>Circuit Breaker - AWS Well-Architected Framework</BadgeLink>
