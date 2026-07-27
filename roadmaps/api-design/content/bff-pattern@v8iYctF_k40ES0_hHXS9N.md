# BFF Pattern

The Backend for Frontend (BFF) pattern involves creating a dedicated API layer for each type of client, typically one BFF for web, one for mobile, and possibly one for third-party consumers. Rather than forcing all clients to use a single general-purpose API, each BFF is tailored to the exact data shape and interaction patterns its client needs. This reduces over-fetching, simplifies client logic, and allows each frontend team to evolve their API contract independently without affecting other clients.

Visit the following resources to learn more:

- [@article@Backend for Frontend](https://bff-patterns.com/)
- [@video@"Backends for Frontends": what is it?](https://www.youtube.com/watch?v=tmGnpU8xOGE)