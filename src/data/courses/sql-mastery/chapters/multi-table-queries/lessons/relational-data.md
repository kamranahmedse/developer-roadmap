---
title: Relational Data
description: Learn how data is organized and related in relational databases
order: 100
type: lesson-challenge
---

By now, you should have a good understanding of what relational databases are and how they store data in tables. Before we dive into multi-table queries, let’s take a step back and revisit the concept of relational data to understand relationships.

## Example of Relational Data

Imagine you’re managing a bookstore. You need to keep track of books, customers, and the books they purchase. How would you organize all this information?

We’ve already established that we can store this data in tables. At a high level, we might have three **tables** (also called **entities**):

- **Books** – Information about books, like title, author, and price.
- **Customers** – Information such as name and email.
- **Sales** – Tracks sales info such as book, customer, price etc.

One of the key benefits of relational data is that it allows us to define relationships between entities in an intuitive way. For example, if we have following structure of our `books` and `customers` tables:

| Book ID | Title                 | Author              | Price  |
| ------- | --------------------- | ------------------- | ------ |
| 1       | The Great Gatsby      | F. Scott Fitzgerald | $10.99 |
| 2       | To Kill a Mockingbird | Harper Lee          | $8.99  |
| 3       | 1984                  | George Orwell       | $12.99 |

| Customer ID | Name       | Email                  |
| ----------- | ---------- | ---------------------- |
| 1           | John Doe   | john.doe@example.com   |
| 2           | Jane Smith | jane.smith@example.com |

Our `sales` table might look like this:

| Sale ID | Book ID | Customer ID | Quantity | Price  |
| ------- | ------- | ----------- | -------- | ------ |
| 1       | **1**   | **1**       | 1        | $10.99 |
| 2       | **2**   | **2**       | 2        | $17.98 |
| 3       | **3**   | **1**       | 3        | $38.97 |

Notice how we did not duplicate the book and customer information in the `sales` table. Instead, we used the `Book ID` and `Customer ID` to reference the `books` and `customers` tables. This has several benefits:

- **Data Integrity**: We avoid redundant data, reducing storage requirements and minimizing the risk of inconsistencies.
- **Flexibility**: If we need to change the book or customer information, we can do so in one place and have the changes reflected in all related sales records.
- **Scalability**: Relational databases can handle large volumes of data efficiently, making it easier to manage complex datasets.

Relational databases allow us to define these relationships and provide powerful tools for query and analyze relationships between data in an efficient way.

## Entities and Attributes

Before we move on to the next lesson, where we will dive deeper into relationships and the different types of relationships, let's first clarify some terminology.

There are two key concepts in relational data:

### Entity

An entity is a real-world object or concept that we want to store information about. For example, in our bookstore, `books` and `customers` are entities. `sales` is also an entity because it captures transactions between books and customers.

### Attribute

Attributes are details or properties that describe an entity. In our example above, `books` entity has attributes like `title`, `author`, `price`, etc. `customers` entity has attributes like `name`, `email`, etc. Similarly `sales` entity has attributes like `price`, `quantity`, etc.

#### Primary and Foreign Keys

Apart from the normal attributes discussed above, each entity may have some special attributes i.e. **primary key** and **foreign key**.

> Primary key is a column or a set of columns that uniquely identifies each row in a table.

We have already discussed primary keys in the previous chapter about DDL. To recap, **primary key** is a column or a set of columns that uniquely identifies each row in a table. For example, `book_id` in `books` and `customer_id` in `customers` are primary keys.

> Foreign key is a field in one table that refers to the primary key of another table.

In addition to that, each entity may have one or more foreign keys. **Foreign key** is a field in one table that refers to the primary key of another table. For example, in our `sales` table, `book_id` and `customer_id` are foreign keys that refer to the `book_id` and `customer_id` in the `books` and `customers` tables respectively.

| Table Name | Primary Key   | Foreign Key              |
| ---------- | ------------- | ------------------------ |
| books      | `book_id`     |                          |
| customers  | `customer_id` |                          |
| sales      | `sale_id`     | `book_id`, `customer_id` |

---

In the next lesson, we will dive deeper into relationships and the different types of relationships.