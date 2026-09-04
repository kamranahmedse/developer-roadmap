# Retry
 
The retry pattern automatically re-attempts a failed operation, under the assumption that many failures in distributed systems are transient and will succeed if tried again shortly after. Retries are usually combined with strategies like exponential backoff to avoid overwhelming a struggling service. Care is needed to ensure the retried operation is safe to repeat, ideally by making it idempotent.

Visit the following resources to learn more:

- [@article@Retry pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/retry)