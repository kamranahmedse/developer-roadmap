# Transactional Operations

Durable Objects support transactional operations. You can perform multiple operations within a single transaction, ensuring that either all operations succeed or none of them do. This helps maintain data consistency and prevents partial updates. If an error occurs during a transaction, the Durable Object automatically rolls back all changes, leaving the data in a consistent state.

Visit the following resources to learn more:

- [@official@Durable Object Storage · Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/api/storage-api/)
- [@official@Transactional Storage · Cloudflare Durable Objects](https://developers.cloudflare.com:2096/durable-objects/api/transactional-storage-api/)
