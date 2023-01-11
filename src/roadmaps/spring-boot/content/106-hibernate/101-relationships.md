# Relationships

Using hibernate, if we want to put relationship between two entities [ objects of two pojo classes ], then in the database tables, there must exist foreign key relationship, we call it as Referential integrity.

The main advantage of putting relation ship between objects is, we can do operation on one object, and the same operation can transfer onto the other object in the database [ remember, object means one row in hibernate terminology ]

While selecting, it is possible to get data from multiple tables at a time if there exits relationship between the tables, nothing but in hibernate relationships between the objects

Using hibernate we can put the following 4 types of relationships

- One-To-One
- Many-To-One
- Many-To-Many
- One-To-Many

Visit the following links for more information:

- [Hibernate Relationships In Depth](https://www.java4s.com/hibernate/hibernate-relationships-in-depth/)
- [Guide to JPA with Hibernate - Relationship Mapping](https://stackabuse.com/a-guide-to-jpa-with-hibernate-relationship-mapping/)
- [Hibernate Mapping](https://dzone.com/articles/hibernate-mapping)

