---
title: 'Consistency Patterns'
description: 'Everything you need to know about Week, Strong and Eventual Consistency'
authorId: 'kamran'
seo:
  title: 'Consistency Patterns - roadmap.sh'
  description: 'Everything you need to know about Week, Strong and Eventual Consistency'
isNew: false
type: 'textual'
date: 2023-01-18
sitemap:
  priority: 0.7
  changefreq: 'weekly'
tags:
  - 'guide'
  - 'visual-guide'
  - 'guide-sitemap'
---

Before we talk about the Consistency Patterns, we should know what a distributed system is. Simply put, a distributed system is a system that consists of more than one components, and each component is responsible for one part of the application.

> A distributed system is a system whose components are located on different networked computers, which communicate and coordinate their actions by passing messages to one another. The components interact with one another in order to achieve a common goal. - Wikipedia

## Distributed Systems

Imagine we have an e-commerce application where we are selling books. This application may consist of multiple different components. For example, one server might be responsible for the accounts, another might be responsible for the payments, one might be responsible for storing orders, one might be responsible for loyalty points and relevant functionalities, and another might be responsible for maintaining the books inventory and so on.

![Book Store - Distributed System](https://i.imgur.com/VHATt7a.png)

Now, if a user buys a book, there might be different services involved in placing the order; order service for storing the order, payment service for handling the payments, and inventory service for keeping the stock of that ordered book up to date. This is an example of a distributed system, an application that consists of multiple different components, each of which is responsible for a different part of the application.

## Why is Consistency Important?

When working with distributed systems, we need to think about managing the data across different servers. If we take the above example of the e-commerce application, we can see that the inventory service must have up-to-date stock information for the ordered items if the user places an order. Now, there might be two different users looking at the same book. Now imagine if one of the customers places a successful order, and before the inventory service can update the stock, the second customer also places the order for the same book. In that case, when the inventory wasn't updated, we will have the wrong stock information when the second order was placed, i.e., the ordered book may or may not be available in stock. This is where different consistency patterns come into play. They help ensure that the data is consistent across the application.

## Consistency Patterns

Consistency patterns refer to the ways in which data is stored and managed in a distributed system and how that data is made available to users and applications. There are three main types of consistency patterns:

- Strong consistency
- Weak consistency
- Eventual Consistency

Each of these patterns has its own advantages and disadvantages, and the choice of which pattern to use will depend on the specific requirements of the application or system.

### Strong Consistency

> After an update is made to the data, it will be immediately visible to any subsequent read operations. The data is replicated in a synchronous manner, ensuring that all copies of the data are updated at the same time.

In a strong consistency system, any updates to some data are immediately propagated to all locations. This ensures that all locations have the same version of the data, but it also means that the system is not highly available and has high latency.

An example of strong consistency is a financial system where users can transfer money between accounts. The system is designed for **high data integrity**, so the data is stored in a single location and updates to that data are immediately propagated to all other locations. This ensures that all users and applications are working with the same, accurate data. For instance, when a user initiates a transfer of funds from one account to another, the system immediately updates the balance of both accounts and all other system components are immediately aware of the change. This ensures that all users can see the updated balance of both accounts and prevents any discrepancies.

### Weak Consistency

> After an update is made to the data, it is not guaranteed that any subsequent read operation will immediately reflect the changes made. The read **may or may not** see the recent write.

In a weakly consistent system, updates to the data may not be immediately propagated. This can lead to inconsistencies and conflicts between different versions of the data, but it also allows for **high availability and low latency**.

Another example of weak consistency is a gaming platform where users can play online multiplayer games. When a user plays a game, their actions are immediately visible to other players in the same data center, but if there was a lag or temporary connection loss, the actions may not be seen by some of the users and the game will continue. This can lead to inconsistencies between different versions of the game state, but it also allows for a high level of availability and low latency.

### Eventual Consistency

> Eventual consistency is a form of Weak Consistency. After an update is made to the data, it will be eventually visible to any subsequent read operations. The data is replicated in an asynchronous manner, ensuring that all copies of the data are eventually updated.

In an eventually consistent system, data is typically stored in multiple locations, and updates to that data are eventually propagated to all locations. This means that the system is highly available and has low latency, but it also means that there may be inconsistencies and conflicts between different versions of the data.

An example of eventual consistency is a social media platform where users can post updates, comments, and messages. The platform is designed for high availability and low latency, so the data is stored in multiple data centers around the world. When a user posts an update, the update is immediately visible to other users in the same data center, but it may take some time for the update to propagate to other data centers. This means that some users may see the update while others may not, depending on which data center they are connected to. This can lead to inconsistencies between different versions of the data, but it also allows for a high level of availability and low latency.

## Conclusion

In conclusion, consistency patterns play a crucial role in distributed systems, and the choice of which pattern to use will depend on the specific requirements of the application or system. Each pattern has its own advantages and disadvantages, and each is more suitable for different use cases. Weak consistency is suitable for systems that require high availability and low latency, strong consistency is suitable for systems that require high data integrity, and eventual consistency is suitable for systems that require both high availability and high data integrity.
