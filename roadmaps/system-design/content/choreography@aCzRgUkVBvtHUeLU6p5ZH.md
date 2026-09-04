# Choreography
 
Choreography is an approach to coordinating a distributed workflow where each service reacts to events and decides its own next action, rather than a central controller directing the process. Services publish events when they complete a step, and other services listen and respond accordingly. This keeps services loosely coupled but can make the overall flow harder to trace.

Visit the following resources to learn more:

- [@article@Choreography pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/choreography)