# Sharding
 
Sharding splits a database horizontally, distributing rows of the same table across multiple database servers based on a shard key, such as user ID. Each shard holds a subset of the total data, which allows the system to scale beyond what a single server could handle. Choosing a good shard key is critical, since a poor choice can lead to uneven load across shards.

Visit the following resources to learn more:

- [@article@The coming of the Shard](http://highscalability.com/blog/2009/8/6/an-unorthodox-approach-to-database-design-the-coming-of-the.html)
- [@article@Shard (database architecture)](https://en.wikipedia.org/wiki/Shard_(database_architecture))