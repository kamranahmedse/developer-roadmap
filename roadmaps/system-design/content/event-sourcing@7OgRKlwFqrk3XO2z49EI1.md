# Event Sourcing
 
Event sourcing stores every change to an application's state as a sequence of immutable events, rather than storing just the current state. The current state can always be reconstructed by replaying the events in order, and the full history of changes is preserved. This provides a complete audit trail and makes it easier to debug how a system reached its current state.

Visit the following resources to learn more:

- [@article@Event Sourcing pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)
- [@video@Event Sourcing Explained Using Football](https://www.youtube.com/watch?v=xPmQxYIi5fA&list=PLCl5BUbK0jXt5l18S5UNAoUc4eQ2PJDye)