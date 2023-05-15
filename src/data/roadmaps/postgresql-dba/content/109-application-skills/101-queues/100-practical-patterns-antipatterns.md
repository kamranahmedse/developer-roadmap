# Practical Patterns and Antipatterns for Queues in PostgreSQL

Using PostgreSQL for implementing queues is a common practice. Here, we will discuss some practical patterns and antipatterns that you should be aware of when working with queues in PostgreSQL.

## Patterns

### Implementing a simple queue using SKIP LOCKED

A simple way to implement a queue is by using the `SKIP LOCKED` functionality that PostgreSQL offers. We use a table `jobs` to store our queue items:

```sql
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    payload JSONB,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING'
);
```

Queue items can be inserted like this:

```sql
INSERT INTO jobs (payload) VALUES ('{"task": "do something"}');
```

And dequeued items can then be fetched like this:

```sql
BEGIN;
SELECT * FROM jobs WHERE status = 'PENDING'
ORDER BY id ASC
FOR UPDATE SKIP LOCKED
LIMIT 1;
-- now do something with the dequeued job
UPDATE jobs SET status = 'DONE' WHERE id = <dequeued_id>;
COMMIT;
```

### Implementing a retry mechanism using a separate column

In real-life situations, you might want to retry failed jobs in your queue. To do so, you can add a `retries` column to your jobs table:

```sql
ALTER TABLE jobs ADD COLUMN retries INT DEFAULT 3;
```

And modify the dequeue query to handle failed jobs:

```sql
BEGIN;
SELECT * FROM jobs WHERE status = 'PENDING' OR (status = 'FAILED' AND retries > 0)
ORDER BY id ASC
FOR UPDATE SKIP LOCKED
LIMIT 1;
-- now do something with the dequeued job
-- if successful:
UPDATE jobs SET status = 'DONE' WHERE id = <dequeued_id>;
-- if failed:
UPDATE jobs SET status = 'FAILED', retries = retries - 1 WHERE id = <dequeued_id>;
COMMIT;
```

## Antipatterns

### Polling for queue items

One common antipattern is polling the database for new queue items. This can be computationally expensive and can severely impact the performance of your overall implementation. Instead, consider using `SKIP LOCKED` as described earlier and make use of PostgreSQL's row-level locking mechanism.

### Using expensive data types for payload

When inserting payload data into your jobs table, it's important to use suitable data types. For instance, storing payload data in a `JSONB` column can result in parsing and storing overhead. Depending on your use case, consider using simpler data types like `VARCHAR`, `INTEGER`, or even byte arrays.

### Simultaneously dequeuing multiple items

While it might be tempting to dequeue multiple items at once to optimize performance, this can lead to inefficiencies and may cause your transactions to wait for locks. Instead, only dequeue a single item at a time using `LIMIT 1` in your query.

By following the practical patterns and avoiding the antipatterns, you can make your PostgreSQL-based queue implementation more efficient and functional.