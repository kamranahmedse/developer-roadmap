# Write-behind
 
In the write-behind, or write-back, caching strategy, data is written to the cache first and then asynchronously written to the database after some delay. This makes writes very fast from the application's perspective, since it does not wait on the database. The risk is potential data loss if the cache fails before the delayed write reaches the database.

Visit the following resources to learn more:

- [@article@Scalability, availability, stability, patterns](http://www.slideshare.net/jboner/scalability-availability-stability-patterns/)