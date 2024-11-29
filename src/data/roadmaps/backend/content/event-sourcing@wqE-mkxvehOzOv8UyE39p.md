# Event Sourcing

Event sourcing is a design pattern in which the state of a system is represented as a sequence of events that have occurred over time. In an event-sourced system, changes to the state of the system are recorded as events and stored in an event store. The current state of the system is derived by replaying the events from the event store. One of the main benefits of event sourcing is that it provides a clear and auditable history of all the changes that have occurred in the system. This can be useful for debugging and for tracking the evolution of the system over time.Event sourcing is often used in conjunction with other patterns, such as Command Query Responsibility Segregation (CQRS) and domain-driven design, to build scalable and responsive systems with complex business logic. It is also useful for building systems that need to support undo/redo functionality or that need to integrate with external systems.

Visit the following resources to learn more:

- [@article@Event Sourcing - Martin Fowler](https://martinfowler.com/eaaDev/EventSourcing.html)
- [@video@Event Sourcing 101](https://www.youtube.com/watch?v=lg6aF5PP4Tc)
- [@feed@Explore top posts about Architecture](https://app.daily.dev/tags/architecture?ref=roadmapsh)
