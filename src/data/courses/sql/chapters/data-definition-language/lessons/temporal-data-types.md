---
title: Temporal Data Types
description: Learn about date and time data types in SQL and how to use them effectively.
order: 140
type: lesson-challenge
---

Temporal data types are used to store date and time data. These are one of the most important data types in SQL and understanding them is crucial for working with any application that needs to store time-based data.

Given below is the list of temporal data types in SQL with their sample usage:

| Category    | Description                                       | Example Usage                     |
| ----------- | ------------------------------------------------- | --------------------------------- |
| `DATE`      | Stores only the date (year, month, day)           | Birth dates, holidays, deadlines  |
| `TIME`      | Stores only the time of day                       | Store hours, appointment times    |
| `DATETIME`  | Stores both date and time                         | Event times, log entries          |
| `TIMESTAMP` | Similar to `DATETIME` but with timezone awareness | e.g. Calendar events              |

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

These types store both date and time information. While they might seem similar, there is an important distinction: `TIMESTAMP` values are converted from the current time zone to `UTC` for storage, and converted back from `UTC` to the current time zone for retrieval. However, `DATETIME` values are stored and retrieved without any timezone conversion.

```sql
CREATE TABLE orders (
  id INTEGER,
  book_id INTEGER,
  order_datetime DATETIME,
  payment_confirmed_at TIMESTAMP
);

-- Insert a book order
INSERT INTO orders (id, book_id, order_datetime, payment_confirmed_at)
VALUES (
  1,
  101,
  '2024-03-15 14:30:00',
  CURRENT_TIMESTAMP
);
```

If you query the data back from the database, you won't see any timezone information but the `payment_confirmed_at` column has underlying timezone information that is used for storage and retrieval.

---

Alright, now that we have seen the temporal data types, let's look at some common operations you might perform with temporal data in a bookstore.

## Common Operations with Temporal Data

Here are some common operations you might perform with temporal data in a bookstore:

### Difference between two dates

In MySQL, you can use the `DATEDIFF` function to calculate the difference between two dates. For example, given the following table:

| id  | title               | publication_date | reprint_date |
| --- | ------------------- | ---------------- | ------------ |
| 1   | The Great Adventure | 2023-05-15       | 2024-01-01   |

You can use the following query to calculate how long books have been in print:

```sql
SELECT
    title,
    publication_date,
    reprint_date,
    DATEDIFF(reprint_date, publication_date) as days_in_print
FROM books;
```

The output will be:

| id  | title               | publication_date | reprint_date | days_in_print |
| --- | ------------------- | ---------------- | ------------ | ------------- |
| 1   | The Great Adventure | 2023-05-15       | 2024-01-01   | 231           |

### Getting the Month of Sales

Given the following `sales` table:

| id  | customer_name | book_id | sale_amount | sale_date  |
| --- | ------------- | ------- | ----------- | ---------- |
| 1   | John Doe      | 101     | 100.00      | 2024-01-01 |
| 2   | Jane Smith    | 102     | 150.00      | 2024-02-15 |
| 3   | Alice Johnson | 103     | 200.00      | 2024-03-20 |
| 4   | Bob Brown     | 104     | 120.00      | 2024-04-25 |
| 5   | Carol Green   | 105     | 180.00      | 2024-05-30 |

You can use the following query to get the month of sales:

```sql
SELECT
    customer_name,
    DATE_FORMAT(sale_date, '%M') as month,
    sale_amount
FROM sales;
```

The output will be:

| customer_name | month    | sale_amount |
| ------------- | -------- | ----------- |
| John Doe      | January  | 100.00      |
| Jane Smith    | February | 150.00      |
| Alice Johnson | March    | 200.00      |
| Bob Brown     | April    | 120.00      |
| Carol Green   | May      | 180.00      |

### Getting Sales for a Specific Dates

You can use the `WHERE` clause and perform range queries on the date column. For example, given the following table:

| id  | customer_name | book_id | sale_amount | sale_date  |
| --- | ------------- | ------- | ----------- | ---------- |
| 1   | John Doe      | 101     | 100.00      | 2024-01-01 |
| 2   | Jane Smith    | 102     | 150.00      | 2024-02-15 |
| 3   | Alice Johnson | 103     | 200.00      | 2024-03-20 |
| 4   | Bob Brown     | 104     | 120.00      | 2024-03-25 |
| 5   | Carol Green   | 105     | 180.00      | 2024-03-30 |

You can use the following query to get the sales for March 2024:

```sql
SELECT
    customer_name,
    sale_amount
FROM sales
WHERE sale_date BETWEEN '2024-03-01' AND '2024-03-31';
```

The output will be:

| customer_name | sale_amount |
| ------------- | ----------- |
| Alice Johnson | 200.00      |
| Bob Brown     | 120.00      |
| Carol Green   | 180.00      |

> Note: The exact syntax for temporal operations might vary between different database systems. Always consult your specific database's documentation for the most accurate information. Here is the [MySQL documentation](https://dev.mysql.com/doc/en/date-and-time-functions.html) and [PostgreSQL documentation](https://www.postgresql.org/docs/current/functions-datetime.html).

Feel free to go through the documentations above for different functions available for temporal data types. We will also look at more examples in the future lessons.
