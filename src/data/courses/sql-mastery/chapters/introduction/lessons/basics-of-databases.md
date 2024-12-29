---
title: Basics of Databases
description: Learn the basics of SQL, the language for querying databases.
order: 100
type: lesson
---

Before we dive into everything SQL, let's first get the basics out. This chapter covers the basics of databases, different types of databases, SQL, it's different flavors, and the types of queries.

## Data in the Modern World

In today's digital world, data is everywhere. Every application we use needs to store and manage data in some way:

- Social media apps like Twitter, Facebook, and Instagram track billions of posts, likes, and connections between users
- E-commerce platforms like Amazon, eBay, and Shopify handle massive product catalogs, customer profiles, and order histories 
- Banking systems process millions of transactions and maintain accurate account balances
- Streaming services like Netflix, Hulu, and Spotify manage vast libraries of content and personalized user recommendations

This ever-growing volume of data needs to be stored, organized, and accessed efficiently. This is where databases come in - they provide a way to store data in a structured way that allows for efficient retrieval and manipulation.

## What is a Database?

A database is essentially an organized collection of data stored electronically in a way that allows for efficient retrieval and manipulation.

Let's say you're building an e-commerce platform - you'll need to store and manage various types of data for your users and products:

- Product information like names, descriptions, prices, categories, and inventory levels
- Customer data including profiles, shipping addresses, and purchase history
- Order details tracking items purchased, quantities, prices, shipping status
- Reviews and ratings from customers for different products
- Financial data for sales, refunds, taxes, and revenue calculations

The database apart from storing this information also enables complex operations like:

- Calculating total revenue across different time periods
- Tracking inventory and automatically flagging low stock items
- Computing shopping cart totals with tax and shipping
- Analyzing customer purchase patterns for personalized recommendations
- Generating sales reports by product category or region

Without a proper database system, managing these interconnected pieces of data and performing these calculations would be extremely challenging. The database provides the foundation for building a scalable and efficient e-commerce platform.

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