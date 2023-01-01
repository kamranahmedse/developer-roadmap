# Normalization vs Denormalization

Database normalization is a process used to organize a database into tables and columns. The idea is that a table should be about a specific topic and that only those columns which support that topic are included. This limits the number of duplicate data contained within your database. This makes the database more flexible by eliminating issues stemming from database modifications.

Denormalization is the opposite of normalization. It is the process of adding redundant data to a database to improve read performance. This is done by adding duplicate data into multiple tables to avoid expensive joins. This is done at the expense of increased storage and decreased write performance.

- [Normalization vs. Denormalization | Events and Event Streaming](https://www.youtube.com/watch?v=sDU94hraq8g)
- [Normalization - 1NF, 2NF, 3NF and 4NF](https://www.youtube.com/watch?v=UrYLYV7WSHM)
