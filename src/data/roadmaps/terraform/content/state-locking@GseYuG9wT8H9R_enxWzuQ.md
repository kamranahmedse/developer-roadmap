# State Locking

Terraform state locking is a mechanism that prevents concurrent modifications to the same state file, avoiding potential conflicts and data corruption. When enabled, Terraform acquires a lock before performing operations that could modify the state, such as apply or destroy. If the lock is unavailable, Terraform waits or fails, depending on configuration. State locking is automatically supported by many backend types, including S3 with DynamoDB, Azure Blob Storage, and Terraform Cloud. It's crucial for team environments where multiple users or automation processes might attempt simultaneous changes. While essential for data integrity, it's important to implement proper lock management to prevent stuck locks from blocking operations.

Learn more from the following resources:

- [@official@State - Locking](https://developer.hashicorp.com/terraform/language/state/locking)
- [@official@State Storage and Locking](https://developer.hashicorp.com/terraform/language/state/backends)
- [@video@Terraform - State locking](https://www.youtube.com/watch?v=QdDCUpggmrw)