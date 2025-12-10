# Coordinating Nodes

Coordinating nodes in Elasticsearch are like traffic controllers. They receive client requests, route them to the appropriate data nodes that hold the relevant data shards, and then consolidate the results before sending them back to the client. These nodes don't hold any data themselves, but they play a crucial role in distributing the workload and ensuring efficient query execution across the cluster.

Visit the following resources to learn more:

- [@official@Coordinating node](https://www.elastic.co/docs/deploy-manage/distributed-architecture/clusters-nodes-shards/node-roles#coordinating-node)
- [@official@Coordinating only node](https://www.elastic.co/docs/deploy-manage/distributed-architecture/clusters-nodes-shards/node-roles#coordinating-only-node-role)