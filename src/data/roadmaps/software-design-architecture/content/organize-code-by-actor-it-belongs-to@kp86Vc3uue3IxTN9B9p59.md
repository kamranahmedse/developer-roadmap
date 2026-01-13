# Organize Code by Actor It Belongs To

Organizing code by the actor it belongs to means structuring your codebase around the primary users, roles, or systems that interact with it. Instead of grouping code purely by technical layers (controllers, services, repositories), you group it by _who_ or _what_ uses the functionality. This improves cohesion, discoverability, and long-term maintainability.

Some key ideas behind this approach include:

*   Actor-focused structure: Group related functionality by user roles, domains, or external systems (e.g., `admin`, `customer`, `payment-gateway`).
*   High cohesion: Keep logic that changes for the same reason in the same place.
*   Reduced coupling: Minimize dependencies between unrelated actors or domains.
*   Clear ownership: Each module clearly represents a responsibility or business capability.
*   Easier navigation: Developers can quickly find relevant code based on the actor they are working on.
*   Scalability: The codebase grows more naturally as new actors or features are added.
*   Improved testing: Actor-based modules are easier to test in isolation.
*   Alignment with business logic: The structure mirrors real-world use cases and workflows.
*   Better collaboration: Teams can own specific actors or domains.
*   Cleaner boundaries: Encourages well-defined APIs between parts of the system.

Visit the following resources to learn more:

- [@article@Package by Feature vs Package by Layer](https://www.baeldung.com/java-packaging-structures)
- [@article@Screaming Architecture](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html)
- [@feed@Explore top posts about Software Architecture](https://app.daily.dev/tags/software-architecture?ref=roadmapsh)