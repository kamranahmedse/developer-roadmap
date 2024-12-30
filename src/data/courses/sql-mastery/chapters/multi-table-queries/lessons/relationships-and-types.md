---
title: Relationships and Types
description: Learn how data is organized and related in relational databases
order: 110
type: lesson
---

In the previous lesson, we explored how relational databases store data in tables and how entities and attributes are defined. Now, let's delve deeper into the types of relationships that can exist between these entities and how they are represented.

Let's take the same example of our bookstore. Here are different entities we have in our bookstore:

| Entity Name          | Description                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| `books`              | A book is a collection of words or other symbols that are formally published in print or electronically. |
| `customers`          | A customer is an individual or organization that purchases goods or services from a business.            |
| `sales`              | A sale is a transaction where a customer purchases a book from the bookstore.                            |
| `authors`            | An author is a person who writes books.                                                                  |
| `author_biographies` | An author biography is a detailed account of an author's life and work.                                  |
| `employees`          | An individual who has access to the bookstore system.                                                    |

We will use these entities to explore the different types of relationships.

![](https://assets.roadmap.sh/guest/sample-bookstore-entities-ehg5t.png)

## Types of Relationships

In a relational database, relationships define how entities interact with each other. There are three primary types of relationships:

### One-to-One (1:1)

A one-to-one relationship occurs when a single record in one table is related to a single record in another table. This type of relationship is less common but can be useful for splitting data into different tables for organizational purposes.

In our bookstore example, imagine we have a table for `authors` and another for `author_biographies`. Each author has exactly one biography, and each biography belongs to exactly one author.

![](https://assets.roadmap.sh/guest/one-to-one-relationship-od19a.png)

The `author_id` column in the `author_biographies` table is a foreign key that references the `author_id` column in the `authors` table.

> ### Alternative Approach
>
> If you look closely, you'll see that we could also achieve this relationship by adding a `biography_id` column to the `authors` table instead i.e.
>
> ![](https://assets.roadmap.sh/guest/alternative-one-to-one-m6hl4.png)
>
> Here we have `biography_id` as a foreign key inside the `authors` table that references the `id` column in the `author_biographies` table.
>
> Both approaches are valid, but personally, I prefer to put the foreign key in the table that depends on the principle entity i.e. the entity which does not rely on another entity for its existence. In this case, `author_biographies` can't exist without `authors`.

### One-to-Many (1:N)

A one-to-many relationship is the most common type of relationship. It occurs when a single record in one table is related to multiple records in another table.

In our bookstore, a single `customer` can purchase several books i.e. several entries in the `sales` table. Thus, the `customers` and `sales` tables have a one-to-many relationship.

![](https://assets.roadmap.sh/guest/one-to-many-t326c.png)

### Many-to-Many (M:N)

A many-to-many relationship occurs when multiple records in one table are related to multiple records in another table. This type of relationship is typically implemented using a junction table.

> A **junction table** is a table that is used to store the relationship between two tables. It contains foreign keys from both tables that it is bridging.

In our bookstore, a `book` can be purchased by multiple `customers`, and a `customer` can purchase multiple `books`. We can represent this relationship using a `sales` table as a junction table.

![](https://assets.roadmap.sh/guest/many-to-many-c7ytk.png)

## Entity-Relationship (ER) Diagrams

Now that we have a good understanding of the different types of relationships, let's explore how to visually represent them using Entity-Relationship (ER) diagrams.

### What are ER Diagrams?

Entity-Relationship (ER) diagrams are a visual representation of the entities in a database and the relationships between them. They help in designing and understanding the database structure.

We have already been drawing a rough diagram representing our bookstore. Let's complete the same diagram and then see how we can convert it into a proper ER diagram.

[![](https://assets.roadmap.sh/guest/rough-erd-bookstore-6svpg.png)](https://assets.roadmap.sh/guest/rough-erd-bookstore-6svpg.png)

The diagram above shows all the entities and their relationships with other entities. An ER diagram is similar to the diagram above but uses standard symbols to represent the relationships and has attributes for each entity. These symbols are given below:

![](https://assets.roadmap.sh/guest/crowfoot-lugsr.png)

The ER diagram using these symbols would look like this:

[![](https://assets.roadmap.sh/guest/erd-bookstore-x8hin.png)](https://assets.roadmap.sh/guest/erd-bookstore-x8hin.png)

This representation is also known as a Crow's Foot notation -- named after the symbol used for the one-to-many relationship resembling a crow's foot.

> Please note that I have explained the relationship descriptions shown in the diagram are not a part of the ER diagram. I have just added them to help you understand the relationships better.

The complete ER diagram after adding the attributes is shown below:

[![](https://assets.roadmap.sh/guest/complete-bookstore-erd-vb0fp.png)](https://assets.roadmap.sh/guest/complete-bookstore-erd-vb0fp.png)

In the next lesson, we will look at foreign keys and how they are used to enforce relationships between tables. We will also look at some of the DML operations we can perform on multiple tables.
