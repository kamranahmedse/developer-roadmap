# Change Tracker API

The Change Tracker API is a feature of ORM (Object-Relational Mapping) frameworks, such as Entity Framework Core, that allows developers to track changes to entities and automatically persist them to the database.

The Change Tracker API is typically exposed through the context class, which is the main class that manages the connection to the database and provides access to the entities.

When an entity is retrieved from the database, the Change Tracker API marks it as "unchanged". When a property of the entity is modified, the Change Tracker API marks the entity as "modified". And when a new entity is added to the context, the Change Tracker API marks it as "added".
For more resources, visit the following links:

- [@article@Change Tracking in EF Core](https://learn.microsoft.com/en-us/ef/core/change-tracking/)
- [@article@Intro to Change Tracking](https://www.oreilly.com/library/view/programming-entity-framework/9781449331825/ch05.html)
- [@article@ChangeTracker in Entity Framework Core](https://www.entityframeworktutorial.net/efcore/changetracker-in-ef-core.aspx)
