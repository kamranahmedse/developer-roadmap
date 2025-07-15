# Lazy Eager Explicit Loading

## Eager Loading

Eager Loading helps you to load all your needed entities at once; i.e., all your child entities will be loaded at single database call. This can be achieved, using the Include method, which returns the related entities as a part of the query and a large amount of data is loaded at once.

## Lazy Loading

It is the default behavior of an Entity Framework, where a child entity is loaded only when it is accessed for the first time. It simply delays the loading of the related data, until you ask for it.

Visit the following links for more resources:

- [@article@Eager Loading & Lazy Loading](https://www.c-sharpcorner.com/article/eager-loading-lazy-loading-and-explicit-loading-in-entity-framework/)
- [@article@Difference between Eager and Lazy Loading](https://stackoverflow.com/questions/31366236/lazy-loading-vs-eager-loading)
- [@article@Working With Lazy & Eager Loading in Entity Framework](https://dzone.com/articles/working-with-lazy-loading-and-eager-loading-in-ent)
