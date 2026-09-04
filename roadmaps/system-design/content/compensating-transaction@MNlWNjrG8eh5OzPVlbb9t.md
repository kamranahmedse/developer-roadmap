# Compensating Transaction
 
A compensating transaction undoes the effects of a previous operation when a later step in a multi-step process fails, since distributed transactions cannot always be rolled back atomically like a single database transaction. Each step in the process has a corresponding compensating action defined in advance. This keeps the overall system consistent even when a workflow cannot complete as planned.

Visit the following resources to learn more:

- [@article@Compensating Transaction pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction)
- [@article@Intro to Compensation Transaction](https://en.wikipedia.org/wiki/Compensating_transaction)