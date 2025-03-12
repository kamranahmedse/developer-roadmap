# Sharding

Sharding distributes data across different databases such that each database can only manage a subset of the data. Taking a users database as an example, as the number of users increases, more shards are added to the cluster.

Similar to the advantages of federation, sharding results in less read and write traffic, less replication, and more cache hits. Index size is also reduced, which generally improves performance with faster queries. If one shard goes down, the other shards are still operational, although you'll want to add some form of replication to avoid data loss. Like federation, there is no single central master serializing writes, allowing you to write in parallel with increased throughput.

Learn more from the following links:

- [@article@The coming of the Shard](http://highscalability.com/blog/2009/8/6/an-unorthodox-approach-to-database-design-the-coming-of-the.html)
- [@article@Shard (database architecture)](https://en.wikipedia.org/wiki/Shard_\(database_architecture\))
- [@feed@Explore top posts about Backend Development](https://app.daily.dev/tags/backend?ref=roadmapsh)
