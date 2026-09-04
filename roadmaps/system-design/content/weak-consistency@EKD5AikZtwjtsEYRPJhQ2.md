# Weak Consistency
 
Weak consistency means that after a write, reads are not guaranteed to see that write immediately, or at all. This model works for use cases where occasional data loss or staleness is acceptable, such as real-time voice or video calls, where getting the latest packet matters more than getting every packet.

Visit the following resources to learn more:

- [@article@Consistency Patterns in Distributed Systems](https://cs.fyi/guide/consistency-patterns-week-strong-eventual/)