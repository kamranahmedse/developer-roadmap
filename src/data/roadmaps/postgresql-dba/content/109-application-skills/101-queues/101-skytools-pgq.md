# Skytools PGQ

Skytools is a set of tools developed by Skype to assist with using PostgreSQL databases. One of the key components of Skytools is PGQ, a queuing system built on top of PostgreSQL that provides efficient and reliable data processing.

## How PGQ Works

PGQ utilizes PostgreSQL's built-in features to create a robust and high-performance queuing system. Data is inserted into an event queue using SQL statements, and processed by consumer applications. PGQ ensures data integrity and provides mechanisms to prevent data loss in case of failures.

Here's a brief overview of some core concepts of PGQ:

- **Queue**: A queue is defined by the user as a table within the PostgreSQL database to store events. Events in the queue are processed in the order they are inserted.
- **Event**: An event is a single unit of data containing a specific action and its associated data. Events are added to the queue by producer applications and processed by consumer applications.
- **Producer**: A producer application adds events to the queue. Producers can be external applications or built using PL/pgSQL functions.
- **Consumer**: A consumer application processes the events from the queue. Consumers can be implemented in any programming language capable of interfacing with the PostgreSQL database.

## Benefits of Using PGQ

Integrating PGQ into your PostgreSQL database solution provides several advantages:

- **Scalability**: PGQ can handle a high volume of events, making it suitable for large databases and distributed systems.
- **Fault-tolerance**: PGQ ensures a consistent and reliable event processing by preventing duplicate and lost events.
- **Concurrency**: Multiple consumers can work on the same queue concurrently without affecting each other’s performance.
- **Consistency**: With transactional support, PGQ guarantees the atomicity of event processing, ensuring both the event and its associated data modifications are in sync.

## Getting Started with PGQ

To start using Skytools PGQ, follow these basic steps:

- [Download and install Skytools](https://github.com/pgq/skytools) on your system.
- Create a queue in your PostgreSQL database using the provided functions, for example, `create_queue('queue_name')`.
- Implement a producer to insert events into the queue using SQL statements or PL/pgSQL functions.
- Implement a consumer to process the events from the queue. Skytools provides a Python library [`skytools.pgq`](http://skytools.projects.pgfoundry.org/docs/skytools-3.2/python-api.html) to facilitate consumer development.
- Register your consumer application using the provided Skytools functions, for example, `register_consumer('queue_name', 'consumer_name')`.

By incorporating PGQ into your PostgreSQL workflows, you'll gain a powerful and flexible queuing system that can help you manage and process your data with greater efficiency and reliability.