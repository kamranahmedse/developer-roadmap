# Anti-Corruption Layer
 
An anti-corruption layer sits between two systems with different data models or logic, translating requests and responses so that one system's design does not leak into and pollute the other. It is often used when integrating a new system with a legacy system, keeping the new system's model clean and independent. This isolation makes it easier to later replace or evolve either system without affecting the other.

Visit the following resources to learn more:

- [@article@Anti-corruption Layer pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer)