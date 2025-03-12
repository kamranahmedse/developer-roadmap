# Security Monitoring

All commercial systems that include sensitive data must implement a security structure. The complexity of the security mechanism is usually a function of the sensitivity of the data. In a system that requires users to be authenticated, you should record:

- All sign-in attempts, whether they fail or succeed.
- All operations performed by—and the details of all resources accessed by—an authenticated user.
- When a user ends a session and signs out.

Monitoring might be able to help detect attacks on the system. For example, a large number of failed sign-in attempts might indicate a brute-force attack. An unexpected surge in requests might be the result of a distributed denial-of-service (DDoS) attack. You must be prepared to monitor all requests to all resources regardless of the source of these requests. A system that has a sign-in vulnerability might accidentally expose resources to the outside world without requiring a user to actually sign in.

Visit the following to learn more:

- [@article@Security Monitoring](https://learn.microsoft.com/en-us/azure/architecture/best-practices/monitoring#security-monitoring)
- [@feed@Explore top posts about Monitoring](https://app.daily.dev/tags/monitoring?ref=roadmapsh)
