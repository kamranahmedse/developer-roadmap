# Write-through
 
In the write-through caching strategy, data is written to the cache and the database at the same time, as part of the same operation. This keeps the cache always consistent with the database, since no write completes without updating both. The trade-off is slightly higher write latency, since every write touches two systems.

Visit the following resources to learn more:

- [@article@Scalability, availability, stability, patterns](http://www.slideshare.net/jboner/scalability-availability-stability-patterns/)