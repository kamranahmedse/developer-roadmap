# Database Caching

Database caching involves storing frequently accessed data from a database in a temporary storage location (the cache) to reduce the load on the database and improve application performance. Instead of repeatedly querying the database for the same data, the application first checks the cache. If the data is present (a cache hit), it's retrieved from the cache, which is much faster than a database query. If the data is not in the cache (a cache miss), the application queries the database, retrieves the data, stores it in the cache for future use, and then returns it to the application.

Visit the following resources to learn more:

- [@article@Database Caching](https://aws.amazon.com/caching/database-caching/)
- [@article@Introduction to database caching](https://www.prisma.io/dataguide/managing-databases/introduction-database-caching)
- [@article@Database Caching Strategies](https://medium.com/@sesmiat/database-caching-strategies-f5e40c3c9b74)