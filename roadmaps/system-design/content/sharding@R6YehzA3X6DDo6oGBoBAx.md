# Sharding
 
Sharding splits a database horizontally, distributing rows of the same table across multiple database servers based on a shard key, such as user ID. Each shard holds a subset of the total data, which allows the system to scale beyond what a single server could handle. Choosing a good shard key is critical, since a poor choice can lead to uneven load across shards.

Visit the following resources to learn more:

- [@article@Sharding pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/sharding)