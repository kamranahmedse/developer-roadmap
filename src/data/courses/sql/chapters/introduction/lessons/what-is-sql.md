---
title: What is SQL?
description: Learn the basics of SQL, the language for querying databases.
order: 150
type: lesson
---

As discussed in the previous chapter, SQL (Structured Query Language) is the language used to interact with relational databases. It is a standardized language that allows us to perform various operations on the data stored in the database. We will cover the different operations in detail in later chapters but for now, these operations can include creating, reading, updating, and deleting data.

## SQL is a Declarative Language

SQL is a declarative language, which means that we describe **what we want to achieve rather than how to achieve it**. This is in contrast to imperative languages like Python or JavaScript, where we provide step-by-step instructions on how to achieve a task e.g. to get all students from a file using Python we would write:

```python
# Open the file
students = open("students.txt", "r")
# Read the file
students = students.readlines()
# Print the file
print(students)
```

As you can see, we have to provide the steps to achieve the task. While in SQL, to get all students from a database we would write:

```sql
SELECT * FROM students;
```

Here we are telling the database to select all columns from the `students` table. The database will then figure out how to achieve this task.

## SQL is Case-Insensitive

SQL is case-insensitive, which means that the database will not differentiate between uppercase and lowercase letters. For example, `SELECT` and `select` are considered the same.

## Components of SQL

A relational database is made up of several components. We will cover several of the components in later chapters but the most important ones you need to know for now are Tables, Rows, and Columns.

- **Tables:** A table is a collection of data organized into rows and columns.
- **Rows:** A row is a single record in a table e.g. a `student` table might have a row for each student.
- **Columns:** A table is made up of columns, each column represent a specific attribute of the data e.g. a `student` table might have columns for `name`, `age`, `email`, etc.

There are many other components in a database but these are the most important ones you need to know for now to understand basic SQL operations for querying data.

SQL statements or queries are the commands that we use to interact with the database. They are the building blocks of SQL and are used to perform various operations on the data stored in the database. For example, to get all students from a database where the age is greater than 18 we would write:

```sql
SELECT * 
FROM students
WHERE age > 18;
```

SQL statements are made up of clauses. A clause is a group of SQL keywords and conditions that perform a specific task. For example, if you look at the SQL statement above, we have the `SELECT` clause, the `FROM` clause, and the `WHERE` clause.

We will cover the different clauses in detail in later chapters but for now, here are some of the most common clauses:

- `SELECT`: Used to select data from a database.
- `FROM`: Specifies the table to select data from.
- `WHERE`: Filters the data to select.
- `GROUP BY`: Groups the data by one or more columns.
- `ORDER BY`: Orders the data by one or more columns.
- `LIMIT`: Limits the number of rows returned.

## Flavors of SQL

SQL is a standard language based on the [ISO/IEC 9075 standard](https://en.wikipedia.org/wiki/ISO/IEC_9075). However, there are many different flavors of SQL that are based on this standard. These flavors are different implementations of the SQL standard, optimized for specific databases. For example, MySQL, PostgreSQL, Oracle, and Microsoft SQL Server are all different flavors of SQL.

While these flavors differ, they are all based on the same standard, and therefore, the SQL statements you write will be compatible with most of them. By completing this course, you will be able to write SQL statements that are compatible with most popular database systems.


---

## Key Takeaways

- SQL is a declarative language that allows us to describe what we want to achieve rather than how to achieve it.
- SQL is case-insensitive.
- SQL statements are made up of clauses e.g. `SELECT`, `FROM`, `WHERE`, etc.
- SQL is a standard language based on the ISO/IEC 9075 standard.
- There are many different flavors of SQL that are based on the SQL standard.

In this chapter, we covered the basics of SQL, the language for querying databases. We discussed the different operations that can be performed on a database, the components of a database, the syntax of SQL statements, and the different flavors of SQL. In the next chapter, we will cover the different types of queries in SQL.