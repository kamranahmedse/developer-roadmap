---
title: Temporal Data Types
description: Learn about date and time data types in SQL and how to use them effectively.
order: 140
type: lesson-challenge
setup: |
    ```sql
    -- Create the books table
    CREATE TABLE books (
        id INTEGER PRIMARY KEY,
        title VARCHAR(100),
        publication_date DATE,
        reprint_date DATE
    );

    -- Create the orders table
    CREATE TABLE orders (
        id INTEGER PRIMARY KEY,
        book_id INTEGER,
        order_time TIMESTAMP,
        delivery_date DATE
    );

    -- Create the sales table
    CREATE TABLE sales (
        id INTEGER PRIMARY KEY,
        book_id INTEGER,
        sale_date DATE,
        sale_amount DECIMAL(10,2)
    );

    -- Create the transactions table
    CREATE TABLE transactions (
        id INTEGER PRIMARY KEY,
        type VARCHAR(50),
        transaction_date DATE,
        amount DECIMAL(10,2)
    );

    -- Create the events table
    CREATE TABLE events (
        id INTEGER PRIMARY KEY,
        name VARCHAR(100),
        event_time TIMESTAMP,
        duration INTEGER  -- duration in minutes
    );

    -- Insert sample data into books
    INSERT INTO books (id, title, publication_date, reprint_date) VALUES
        (1, 'The Great Adventure', '2023-05-15', '2024-01-01'),
        (2, 'Mystery of SQL', '2023-08-20', '2024-02-15'),
        (3, 'Database Design 101', '2022-03-10', '2023-11-30'),
        (4, 'Query Optimization', '2024-01-15', NULL);

    -- Insert sample data into orders
    INSERT INTO orders (id, book_id, order_time, delivery_date) VALUES
        (1, 1, '2024-03-15 14:30:00', '2024-03-22'),
        (2, 2, '2024-03-16 09:15:00', '2024-03-23'),
        (3, 1, '2024-03-16 11:45:00', '2024-03-23'),
        (4, 3, '2024-03-17 16:20:00', '2024-03-24'),
        (5, 2, '2024-03-18 10:30:00', '2024-03-25');

    -- Insert sample data into sales
    INSERT INTO sales (id, book_id, sale_date, sale_amount) VALUES
        (1, 1, '2024-03-15', 29.99),
        (2, 2, '2024-03-15', 24.99),
        (3, 1, '2024-03-16', 29.99),
        (4, 3, '2024-03-16', 34.99),
        (5, 2, '2024-03-17', 24.99),
        (6, 4, '2024-03-18', 39.99);

    -- Insert sample data into transactions
    INSERT INTO transactions (id, type, transaction_date, amount) VALUES
        (1, 'SALE', '2024-03-15', 29.99),
        (2, 'SALE', '2024-03-15', 24.99),
        (3, 'REFUND', '2024-03-16', -24.99),
        (4, 'SALE', '2024-03-16', 34.99),
        (5, 'SALE', '2024-03-17', 24.99);

    -- Insert sample data into events
    INSERT INTO events (id, name, event_time, duration) VALUES
        (1, 'Book Signing - The Great Adventure', '2024-03-20 14:00:00', 120),
        (2, 'Reading Club', '2024-03-21 10:00:00', 90),
        (3, 'Author Meet & Greet', '2024-03-22 15:30:00', 60),
        (4, 'Database Workshop', '2024-03-23 09:00:00', 180),
        (5, 'Kids Story Time', '2024-03-24 11:00:00', 45);
    ```
---

Temporal data types are used to store date and time data. These are one of the most important data types in SQL and understanding them is crucial for working with any application that needs to store time-based data.

Given below is the list of temporal data types in SQL with their sample usage:

| Category    | Description                                       | Example Usage                    |
| ----------- | ------------------------------------------------- | -------------------------------- |
| `DATE`      | Stores only the date (year, month, day)           | Birth dates, holidays, deadlines |
| `TIME`      | Stores only the time of day                       | Store hours, appointment times   |
| `DATETIME`  | Stores both date and time                         | Event times, log entries         |
| `TIMESTAMP` | Similar to `DATETIME` but with timezone awareness | e.g. Calendar events             |

Let's explore each of these types in detail in the following sections.

### DATE

The `DATE` type is used to store date without any time information. It is perfect for situations where you only need to track the day something happened.

```sql
CREATE TABLE books (
  id INTEGER,
  title VARCHAR(100),
  publication_date DATE,
  reprint_date DATE
);

-- Insert a book record
INSERT INTO books (id, title, publication_date, reprint_date)
VALUES (1, 'The Great Adventure', '2023-05-15', '2024-01-01');

-- Select the book record
SELECT * FROM books;
```

When you insert or query date data, the format `YYYY-MM-DD` is used. This is the standard format for dates based on [ISO 8601 standard](https://en.wikipedia.org/wiki/ISO_8601) and it is used by most databases.

> Both MySQL and PostgreSQL allow you to use the format `YYYYMMDD` when inserting dates as well. You can read more about the date and time literals in the [MySQL documentation](https://dev.mysql.com/doc/en/date-and-time-literals.html) and [PostgreSQL documentation](https://www.postgresql.org/docs/current/datatype-datetime.html#DATATYPE-DATETIME-INPUT-DATES).

When you query the date data back from the database, you will get the date in the format `YYYY-MM-DD` i.e.

| id  | title               | publication_date | reprint_date |
| --- | ------------------- | ---------------- | ------------ |
| 1   | The Great Adventure | 2023-05-15       | 2024-01-01   |

All the databases have formatting functions e.g. MySQL has `DATE_FORMAT` and PostgreSQL has `TO_CHAR` functions which can be used to format the date as per your requirement. For example, query below formats the date data to `DD-MM-YYYY` format.

```sql
SELECT
    id,
    title,
    TO_CHAR(publication_date, 'DD-MM-YYYY') AS publication_date
FROM books;
```

The output will be:

| id  | title               | publication_date |
| --- | ------------------- | ---------------- |
| 1   | The Great Adventure | 15-05-2023       |

### TIME

The `TIME` type stores time-of-day values in the format `HH:MM:SS[.fraction]`. This is useful when you only need to track the time something occurs, regardless of the date.

```sql
CREATE TABLE bookstore_hours (
  day_of_week VARCHAR(10),
  opening_time TIME,
  closing_time TIME
);

-- Insert bookstore hours
INSERT INTO bookstore_hours (day_of_week, opening_time, closing_time)
VALUES
  ('Monday', '09:00:00', '18:00:00'),
  ('Tuesday', '09:00:00', '18:00:00');

-- Select the bookstore hours
SELECT * FROM bookstore_hours;
```

When you query this data back from the database, you will get the same format `HH:MM:SS`.

| day_of_week | opening_time | closing_time |
| ----------- | ------------ | ------------ |
| Monday      | 09:00:00     | 18:00:00     |
| Tuesday     | 09:00:00     | 18:00:00     |

### DATETIME/TIMESTAMP

Most of the databases support `DATETIME` and `TIMESTAMP` types. Both of these types store date and time data with some differences.

For example, MySQL supports both types:

| Type        | Description                                           |
| ----------- | ----------------------------------------------------- |
| `DATETIME`  | Stores both date and time                             |
| `TIMESTAMP` | Stores both date and time but with timezone awareness |

PostgreSQL doesn't have `DATETIME` but has:

| Type          | Description                                           |
| ------------- | ----------------------------------------------------- |
| `TIMESTAMP`   | Stores both date and time                             |
| `TIMESTAMPTZ` | Stores both date and time but with timezone awareness |

Given below is the example of how to create a table with `TIMESTAMP` type in PostgreSQL. The query below however will work for any database that supports `TIMESTAMP` type.

```sql
CREATE TABLE orders (
  id INTEGER,
  book_id INTEGER,
  order_time TIMESTAMP
);

-- Insert a book order (PostgreSQL)
INSERT INTO orders (id, book_id, order_time)
VALUES (
  1,
  101,
  '2024-03-15 14:30:00'
);

-- You can also use CURRENT_TIMESTAMP to get the current timestamp
INSERT INTO orders (id, book_id, order_time)
VALUES (
  2,
  102,
  CURRENT_TIMESTAMP
);

-- Query the orders table
SELECT
    id,
    order_time
FROM orders;
```

The query might return:

| id  | order_time               |
| --- | ------------------------ |
| 1   | 2024-03-15T14:30:00.000Z |
| 2   | 2024-12-28T01:19:58.654Z |

Alright, now that we have seen the temporal data types, let's look at some common operations you might perform with temporal data.

---

## Common Temporal Operations

I have created the following tables with sample data so that you can follow along with the examples below in the editor:

| Table Name     | Columns                                           | Description                                                |
| -------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| `books`        | `id`, `title`, `publication_date`, `reprint_date` | Tracks books with their publication and reprint dates      |
| `orders`       | `id`, `book_id`, `order_time`, `delivery_date`    | Records customer orders with order time and delivery dates |
| `sales`        | `id`, `book_id`, `sale_date`, `sale_amount`       | Daily sales records with transaction dates                 |
| `transactions` | `id`, `type`, `transaction_date`, `amount`        | Financial transactions including purchases and refunds     |
| `events`       | `id`, `name`, `event_time`, `duration`            | Bookstore events like book signings and reading clubs      |

> You don't need to memorize the functions below, it's enough to know that these operations exist and you can refer to the documentation when you need them.
>
> The goal of this section is to give you an idea of how powerful temporal data types are and how you can use them to perform various operations.

### Extracting Parts of Dates

You can extract specific parts of a date like year, month, day, etc:

```sql
-- Get year from a date
SELECT
    sale_date,
    EXTRACT(YEAR FROM sale_date) as sale_year
FROM sales;

-- Get month number
SELECT
    sale_date,
    EXTRACT(MONTH FROM sale_date) as month_num
FROM sales;

-- Get day of month
SELECT
    sale_date,
    EXTRACT(DAY FROM sale_date) as day_of_month
FROM sales;
```

### Date Arithmetic

You can perform various arithmetic operations with dates:

```sql
-- Add or subtract intervals
SELECT
    order_time,
    order_time + INTERVAL '7 days' as delivery_due_date,
    order_time + INTERVAL '1 month' as payment_due_date
FROM orders;

-- Calculate age or duration
SELECT
    title,
    publication_date,
    AGE(CURRENT_DATE, publication_date) as book_age
FROM books;
```

### Date Range Queries

Common ways to filter data based on date ranges:

```sql
-- Records from last 30 days
SELECT *
FROM orders
WHERE order_time >= CURRENT_DATE - INTERVAL '30 days';

-- Records between two dates
SELECT *
FROM sales
WHERE sale_date BETWEEN '2024-01-01' AND '2024-12-31';

-- Records for specific month
SELECT *
FROM transactions
WHERE EXTRACT(YEAR FROM transaction_date) = 2024
AND EXTRACT(MONTH FROM transaction_date) = 3;

-- Records for current month
SELECT *
FROM transactions
WHERE EXTRACT(YEAR FROM transaction_date) = EXTRACT(YEAR FROM CURRENT_DATE)
AND EXTRACT(MONTH FROM transaction_date) = EXTRACT(MONTH FROM CURRENT_DATE);
```

### Date Truncation

Sometimes you might want to truncate the date to a specific part of the date. For example, you might want to get the start of the week, month or year for a given date.

```sql
-- Truncate to start of week
SELECT
    sale_date,
    DATE_TRUNC('week', sale_date) as week_start
FROM sales;

-- Truncate to start of month
SELECT
    transaction_date,
    DATE_TRUNC('month', transaction_date) as month_start
FROM transactions;
```

### Getting Current Date and Time

You can use `CURRENT_DATE` and `CURRENT_TIME` to get the current date and time.

```sql
-- Get current timestamp in different formats
SELECT
    CURRENT_TIMESTAMP,
    CURRENT_DATE,
    CURRENT_TIME;
```

### Filtering Based on Time Parts

You can filter records based on specific parts of datetime values:

```sql
-- Get orders during business hours
SELECT *
FROM orders
WHERE EXTRACT(HOUR FROM order_time) BETWEEN 9 AND 17;

-- Get weekend orders
SELECT *
FROM orders
WHERE EXTRACT(DOW FROM order_time) IN (0, 6); -- Sunday = 0, Saturday = 6

-- Get morning orders (before noon)
SELECT *
FROM orders
WHERE EXTRACT(HOUR FROM order_time) < 12;
```

> Note: The exact syntax for temporal operations might vary between different database systems. Always consult your specific database's documentation for the most accurate information. Here is the [MySQL documentation](https://dev.mysql.com/doc/en/date-and-time-functions.html) and [PostgreSQL documentation](https://www.postgresql.org/docs/current/functions-datetime.html).

Feel free to go through the documentations above for different functions available for temporal data types. We will also look at more examples in the future lessons.
