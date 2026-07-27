# Scopes & Permissions

Scopes are labels attached to an API key or access token that declare what actions it is allowed to perform. Rather than a single all-or-nothing key, scopes let you issue credentials with fine-grained access. For example, a key with orders:read can fetch orders but not create or delete them. This follows the principle of least privilege and limits the blast radius if a key is leaked. Scopes are a core concept in OAuth 2.0 and are equally applicable to plain API key systems.

Visit the following resources to learn more:

- [@article@What are REST API Scopes?](https://auth0.com/blog/permissions-privileges-and-scopes/)