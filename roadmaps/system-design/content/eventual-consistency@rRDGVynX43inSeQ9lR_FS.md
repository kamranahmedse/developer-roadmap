# Eventual Consistency
 
Eventual consistency guarantees that, given enough time without new writes, all replicas of the data will converge to the same value. Reads immediately after a write might return stale data, but the system resolves this over time. DNS and systems like Cassandra rely on this model to stay highly available.

Visit the following resources to learn more:

- [@article@Consistency Patterns in Distributed Systems](https://cs.fyi/guide/consistency-patterns-week-strong-eventual/)