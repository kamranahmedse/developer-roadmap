# The "Split Brain" Problem

The "split brain" problem occurs in distributed systems when a cluster of nodes becomes partitioned into two or more independent sub-clusters that are unable to communicate with each other. Each sub-cluster may then believe it is the primary cluster and start making independent decisions, potentially leading to data inconsistencies and conflicts as each sub-cluster operates as if it's the only authority. This situation can result in data loss or corruption when the partitions eventually rejoin.

Visit the following resources to learn more:

- [@official@Quorum-based decision making](https://www.elastic.co/docs/deploy-manage/distributed-architecture/discovery-cluster-formation/modules-discovery-quorums)
- [@article@Avoiding the Elasticsearch split brain problem, and how to recover](https://bigdataboutique.com/blog/avoiding-the-elasticsearch-split-brain-problem-and-how-to-recover-f6451c)
- [@article@Split-Brain in Distributed Systems](https://dzone.com/articles/split-brain-in-distributed-systems)