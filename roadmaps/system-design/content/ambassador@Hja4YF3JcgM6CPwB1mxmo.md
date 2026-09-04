# Ambassador
 
The ambassador pattern places a helper service in front of a client to handle networking concerns, like retries, monitoring, or protocol translation, on the client's behalf. This lets the main application focus on its core logic while the ambassador manages the complexity of communicating with external services. It is often implemented as a sidecar deployed alongside the client.

Visit the following resources to learn more:

- [@article@Ambassador pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/ambassador)