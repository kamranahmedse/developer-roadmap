![CAP Theorem](https://assets.roadmap.sh/guest/cap-theorem.png)

The CAP theorem says that distributed databases can’t simultaneously provide more than two of the following guarantees:

- Data Consistency: Meaning that every read is always returning the most recent result of the write operation. This is very relevant in this model because we’re dealing with multiple servers and data needs to be replicated almost immediately to guarantee consistency.
- Availability: Meaning that every request will always receive a valid response.
- Partition tolerance: The distributed system continues to operate and work without data loss even during partial network outages.

For example, if the system is consistent and highly available, it won’t be able to withstand partial network outages. If on the other hand, the system is highly available and partition tolerant, it won’t be able to ensure immediate data consistency.