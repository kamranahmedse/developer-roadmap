# Isolates Architecture

Cloudflare's isolated architecture for Workers relies on lightweight V8 isolates. Each Worker runs in its own isolate, providing strong isolation from other Workers and the underlying infrastructure. Isolates start quickly and consume minimal resources, enabling rapid scaling. This architecture prevents code from one Worker from impacting others, enhancing security and stability. The isolation ensures that even if a Worker contains vulnerabilities, it cannot compromise the entire Cloudflare network or other customers' applications.

Visit the following resources to learn more:

- [@official@Reference Architectures · Cloudflare Reference Architecture](https://developers.cloudflare.com/reference-architecture/)
- [@official@Cloudflare Security Architecture](https://developers.cloudflare.com/reference-architecture/architectures/security/)
