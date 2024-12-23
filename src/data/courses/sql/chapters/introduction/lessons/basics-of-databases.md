---
title: Basics of Databases
description: Learn the basics of SQL, the language for querying databases.
order: 100
type: lesson
---

Before we dive into everything SQL, let's first get the basics out. This chapter covers the basics of databases, different types of databases, SQL, it's different flavors, and the types of queries.

## What is a Database?

Every application deals with data in one way or another. Whether it's a social media app storing your posts and friend connections, an e-commerce platform managing product inventories and customer orders, or a banking application handling transactions and account balances - all these applications need somewhere to store their data. This is where databases come in - they provide a systematic way to store, organize, manage and retrieve data efficiently.

To put it simply, a database is a structured collection of data stored in a way that allows for easy retrieval and manipulation. For example, a library database stores information about books, members, and borrowing records - tracking details like book titles, authors, ISBN numbers, member information, due dates, and lending history. This allows librarians to quickly look up books, check availability, manage memberships, and ensure timely returns.

## Database Management Systems (DBMS)

To work with databases, we need specialized software called Database Management Systems (DBMS). A DBMS allows users and application programs to create, read, update, and delete data in the database while handling tasks like security, backup, and performance optimization. Some popular database management systems include MySQL, PostgreSQL, Oracle, Microsoft SQL Server, MongoDB, and more.

## Types of Databases

There are several types of databases, but the two most common ones are:

- Relational Databases
- Non-Relational Databases

### Relational Databases

Data in a relational database is organized into tables, where each table consists of rows and columns. Each row represents a unique record, and each column represents a specific attribute or characteristic of that record. Rows have unique identifiers normally called primary keys. These primary keys are used to link tables together. We will learn more about properly defining tables and relationships in the coming chapters.

Relational databases use SQL (Structured Query Language, pronounced as "sequel" or "S-Q-L") to retrieve, insert, update, and delete data from the database. Both pronunciations are widely accepted in the industry, though "sequel" is more common. The name comes from its purpose as a Structured language for Querying data.

### Non-Relational Databases

Non-relational databases, also known as NoSQL databases, do not use tables to store data. Instead, they use various data models like key-value pairs, documents, graphs, or columnar stores. Some popular NoSQL databases include MongoDB, Cassandra, Couchbase, and Redis.

---

## Takeaways

- A database is a structured collection of data stored in a way that allows for easy retrieval and manipulation.
- To work with databases, we need specialized software called Database Management Systems (DBMS).
- There are two main types of databases: Relational Databases and Non-Relational Databases.
- Relational databases use SQL (pronounced as "sequel" or "S-Q-L") to interact with data.
- Non-relational databases use various data models like key-value pairs, documents, graphs, or columnar stores.