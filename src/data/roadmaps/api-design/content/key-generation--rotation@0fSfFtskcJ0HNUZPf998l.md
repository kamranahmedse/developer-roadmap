# Key Generation & Rotation

Key generation and rotation covers the practices around creating, distributing, and periodically replacing API keys. Generation involves producing keys that are sufficiently random and long to resist brute force. Rotation is the process of replacing an existing key with a new one, either on a schedule or after a suspected compromise, without causing downtime for the consumer. Good key management also includes hashing keys at rest, scoping them to minimum required permissions, and providing consumers with a safe way to rotate without service interruption.

Visit the following resources to learn more:

- [@article@Introduction And Lesson Overview](https://codesignal.com/learn/courses/api-key-authentication-security/lessons/api-key-generation-basics)
- [@video@What Are API Keys, And Why Are They So Important?](https://www.youtube.com/watch?v=sNn23dPRUS8&t=103s)