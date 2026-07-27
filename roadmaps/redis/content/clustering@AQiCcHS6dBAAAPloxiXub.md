# Clustering

Redis Cluster is a distributed implementation of Redis that provides automatic data partitioning across multiple nodes and ensures high availability through data replication. It uses a sharding mechanism to split data across nodes using a hash slot system, where each key is mapped to one of 16,384 slots distributed among the cluster's nodes. Redis Cluster offers fault tolerance by replicating data across master and replica nodes, enabling the cluster to continue operating even if some nodes fail. This setup is ideal for large-scale applications requiring scalability and resilience.

Learn more from the following resources:

- [@official@Scale with Redis Cluster](https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/)
- [@video@How to Create a Cluster in Redis](https://www.youtube.com/watch?v=N8BkmdZzxDg)