# Event Sourcing

Event Sourcing in system design is a pattern that stores the state of a system as a sequence of events, rather than the current state. Each change to the state of the system is recorded as an event, which is stored in an event store. The current state of the system can be derived from the events in the event store. Event sourcing can be used for various purposes such as tracking history, reconstruct state, recover from failures, and auditing. It is often implemented in conjunction with CQRS (Command Query Responsibility Segregation) pattern, which separates the responsibilities of handling read and write operations in a system.

Learn more from the following links:

- [Event Sourcing pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)
- [Overview of Event Sourcing](https://microservices.io/patterns/data/event-sourcing.html)