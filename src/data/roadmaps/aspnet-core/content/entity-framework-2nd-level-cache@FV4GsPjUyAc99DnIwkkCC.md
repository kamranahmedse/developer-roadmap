# Entity Framework Cache

Entity Framework Core(EF Core) is a cross-platform version of the popular Entity Framework data access technology that is lightweight, extendable, and open source.
It can be used as an object-relational mapper (O/RM), which can Allow .NET developers to use .NET objects to interact with a database and Removes the requirement for most of the data-access code that is generally required.

However, during peak loads, high-transaction .NET Core apps using EF Core have performance and scalability problems in the database tier. This is because, although you can scale the application layer by adding more application servers, you can't scale the database tier by adding more database servers.

Visit the following resources to learn more:

- [@article@Entity Framework 2nd Level Cache](https://www.gridgain.com/docs/latest/developers-guide/net-specific/net-entity-framework-cache)
- [@video@What is Entity Framework?](https://www.youtube.com/watch?v=Z7713GBhi4k)
- [@article@Caching In Entity Framework](https://www.c-sharpcorner.com/article/caching-in-entity-framework-ef-core-using-ncache/)
