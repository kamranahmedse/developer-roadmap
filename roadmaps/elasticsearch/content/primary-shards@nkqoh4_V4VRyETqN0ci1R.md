# Primary Shards

Primary shards are the fundamental units of data storage in Elasticsearch. An index is logically divided into one or more primary shards, each of which contains a portion of the index's data. These shards allow Elasticsearch to distribute data across multiple nodes in a cluster, enabling horizontal scaling and improved performance. The number of primary shards is defined at index creation and determines the maximum level of parallelism for indexing and searching.

Visit the following resources to learn more:

- [@official@Clusters, nodes, and shards](https://www.elastic.co/docs/deploy-manage/distributed-architecture/clusters-nodes-shards)
- [@official@Size your shards](https://www.elastic.co/docs/deploy-manage/production-guidance/optimize-performance/size-shards)
- [@article@Understanding Shards in Elasticsearch](https://opster.com/guides/elasticsearch/glossary/what-are-shards-in-elasticsearch/)
- [@article@Elasticsearch shards and replicas: A practical guide](https://www.elastic.co/search-labs/blog/elasticsearch-shards-and-replicas-guide)
- [@video@Nodes, clusters, and shards in Elasticsearch - S1E3:Mini Beginner's Crash Course](https://www.youtube.com/watch?v=9uJNksCj2f8)