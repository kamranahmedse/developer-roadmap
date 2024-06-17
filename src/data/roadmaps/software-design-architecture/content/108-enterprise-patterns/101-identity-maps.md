# Identity Maps

Identity Maps is a pattern used in enterprise application development to maintain a map of objects that have been loaded from the database, keyed by their unique identifier. It is used to ensure that multiple copies of the same object are not created in memory when the same data is accessed multiple times.

The identity map pattern is typically used in conjunction with an ORM (Object-Relational Mapping) tool. When an object is loaded from the database, it is first checked against the identity map to see if it has already been loaded. If it has, the existing object is returned, instead of creating a new copy.

Learn more from the following links:

- [@article@Overview of Identity map pattern](https://en.wikipedia.org/wiki/Identity_map_pattern)
- [@video@Tutorial - Identity Map Design Pattern](https://youtube.com/watch?v=erDxkIyNudY)
