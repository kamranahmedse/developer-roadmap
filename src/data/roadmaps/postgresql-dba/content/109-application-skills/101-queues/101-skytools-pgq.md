# Skytools PGQ

Skytools is a set of tools developed by Skype to assist with using PostgreSQL databases. One of the key components of Skytools is PGQ, a queuing system built on top of PostgreSQL that provides efficient and reliable data processing.

## How PGQ Works

PGQ utilizes PostgreSQL's built-in features to create a robust and high-performance queuing system. Data is inserted into an event queue using SQL statements, and processed by consumer applications. PGQ ensures data integrity and provides mechanisms to prevent data loss in case of failures.

Here's a brief overview of some core concepts of PGQ:

- **Queue**: A queue is defined by the user as a table within the PostgreSQL database to store events. Events in the queue are processed in the order they are inserted.
- **Event**: An event is a single unit of data containing a specific action and its associated data. Events are added to the queue by producer applications and processed by consumer applications.
- **Producer**: A producer application adds events to the queue. Producers can be external applications or built using PL/pgSQL functions.
- **Consumer**: A consumer application processes the events from the queue. Consumers can be implemented in any programming language capable of interfacing with the PostgreSQL database.

- [PgQ — Generic Queue for PostgreSQL](https://github.com/pgq)
