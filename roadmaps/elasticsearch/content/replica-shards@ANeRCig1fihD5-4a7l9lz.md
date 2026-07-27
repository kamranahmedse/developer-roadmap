# Replica Shards

Replica shards are copies of primary shards within an Elasticsearch index. They provide redundancy, ensuring data availability even if a primary shard fails. Additionally, replica shards serve read requests, distributing the load and improving search performance by allowing Elasticsearch to process queries in parallel across multiple shards.

Visit the following resources to learn more:

- [@official@Reading and writing documents](https://www.elastic.co/docs/deploy-manage/distributed-architecture/reading-and-writing-documents)
- [@article@Elasticsearch shards and replicas: A practical guide](https://www.elastic.co/search-labs/blog/elasticsearch-shards-and-replicas-guide)
- [@video@Nodes, clusters, and shards in Elasticsearch - S1E3:Mini Beginner's Crash Course](https://www.youtube.com/watch?v=9uJNksCj2f8)