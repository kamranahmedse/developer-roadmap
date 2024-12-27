---
title: Data Types in SQLite
description: Learn about the differences between SQLite and other databases.
order: 110
type: lesson-challenge
---

Before we dive into data types, I would like to take a moment to explain what SQLite is and how it differs from traditional databases like MySQL, PostgreSQL, etc. More specifically, we will look at the differences in data types between SQLite and other databases.

> ### Optional Lesson
>
> You really don't need to know anything about SQLite. I just wanted to take a moment to talk about it because it's a very popular database, and you might come across it in your career.
>
> Throughout this course and our coding environment, I will be using PostgreSQL, which will help you understand the concepts of SQL in a more traditional database.

## What is SQLite?

SQLite is a lightweight, self-contained database engine known for its simplicity and portability. Unlike MySQL and PostgreSQL, which use a client-server model, SQLite works directly with a single database file on disk. This design removes the need for server management, making it easy to set up and maintain.

While SQLite supports standard SQL, it differs from other databases in how it handles data types.

### Dynamic Typing in SQLite

SQLite uses dynamic typing, meaning it doesn't strictly enforce data types on columns; the data types you define when creating a table have no effect on the data stored in the database, they are merely used as a display hint. This allows storing any value type in any column, e.g. you can store a string in an `INTEGER` column.

For example, the SQL statement below is perfectly valid in SQLite:

```sql
CREATE TABLE users (
  id INTEGER,
  name TEXT,
  age INTEGER
);

-- Although the `age` column is `INTEGER`, it can
-- store a string because of dynamic typing.
INSERT INTO users (id, name, age)
VALUES (1, 'John Doe', 'Twenty Five');
```

If you run the following SQL statement:

```sql
SELECT * FROM users;
```

The output will be:

| id  | name     | age         |
| --- | -------- | ----------- |
| 1   | John Doe | Twenty Five |

You should also note that SQLite supports only a few data types: `INTEGER`, `REAL`, `TEXT`, `BLOB`, and `NULL`. Other data types such as `DECIMAL`, `FLOAT`, `VARCHAR`, etc., are not supported, although it will not complain if you try to assign them to a column.

For more details, check the [SQLite data types](https://www.sqlite.org/datatype3.html) and [why it uses dynamic typing](https://www.sqlite.org/flextypegood.html) in the official documentation.

### Static Typing in Other Databases

Databases like MySQL and PostgreSQL use static typing, which enforces data types assigned to columns. This means a column defined as `INTEGER` can only store numeric values, not strings.

If we run the above example in PostgreSQL we will get an error:

```
ERROR: invalid input syntax for type integer: "Twenty Five"
```

With that said, let's move on to the next lesson about data types.