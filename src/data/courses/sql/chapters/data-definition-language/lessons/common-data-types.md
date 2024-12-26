---
title: Common Data Types
description: Learn about common data types in SQL.
order: 110
type: lesson-challenge
---

In our previous lesson, we learned how to create a table and we looked at some basic data types.

To recap, when we create a table, we define the columns and the data type for each column. Data types are one of the key components of a table and they specify the type of data that can be stored in a column.

## Basic Data Types

Data types can be categorized into these basic categories:

| Category  | Description                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------- |
| Numeric   | Store numeric values e.g. amounts, counts, ratings, measurements, sizes, salaries, etc.           |
| Character | Store textual data of varying or fixed lengths e.g. names, addresses, descriptions, etc.          |
| Temporal  | Stores date, time, and timestamp (has a date and time) values e.g. dates, times, timestamps, etc. |
| Boolean   | Store true/false values e.g. `True` or `False`                                                    |

Different databases have different data types, but all the database support some common data types such as integers, floating-point numbers, strings, dates, and booleans. The table below shows the list of common data types with their description and examples.

| Data Type | Description                                                 |
| --------- | ----------------------------------------------------------- |
| `INT`     | Whole numbers without decimal points e.g. 1, 2, 3, etc.     |
| `FLOAT`   | Numbers with decimal points e.g. 1.99, 2.99, 3.99, etc.     |
| `DOUBLE`  | Like `FLOAT` but with more precision e.g. 1.79769313486231  |
| `VARCHAR` | Max 255 characters long string of text e.g. 'Hello, World!' |
| `CHAR`    | Fixed length string of text e.g. 'Hello'                    |
| `DATE`    | Date in the format YYYY-MM-DD e.g. 2024-01-01               |
| `BOOLEAN` | `True` or `False`                                           |

It's important to carefully analyze the data you are storing and choose the appropriate data type. For example, if you are storing a person's age, you would use an integer data type. A person's weight should be stored in a floating-point number data type, while the amount of money would use a decimal data type.

## Let's look at an Example

> Feel free to run the code below in the editor on the right and look at the `Schema` tab to see the data types for each column.

Let's look at some examples of how to use these data types in a table. Given below is a table that stores information about `users`.

```sql
CREATE TABLE users (
  id INT,
  name VARCHAR(250),
  age INT,
  weight FLOAT,
  is_active BOOLEAN
);
```

Here is the type of data that can be stored in each column:

| Column      | Type      | Description                                                                  |
| ----------- | --------- | ---------------------------------------------------------------------------- |
| `id`        | `INT`     | Non-decimal numbers e.g. `1`, `2`, `3`, etc.                                 |
| `name`      | `VARCHAR` | Text of varying length (maximum 250 characters) e.g. `John Doe`, `Bob Smith` |
| `age`       | `INT`     | Non-decimal numbers e.g. `19`, `22`, `30`, etc.                              |
| `weight`    | `FLOAT`   | Decimal numbers e.g. `73.99`, `65`, `92.06`, etc.                            |
| `is_active` | `BOOLEAN` | Whether the user is active e.g. `True` or `False`                            |

Now you might be wondering:

- Why did we use `VARCHAR` and not `CHAR` for `name`?
- Why did we use `FLOAT` and not `DOUBLE` for `weight`?

Let's look at the differences between these data types which will help you understand why we chose these data types.

### `VARCHAR` vs `CHAR` for the `name` column

The difference between `VARCHAR` and `CHAR` is that `VARCHAR` is a variable length and memory efficient string of text, while `CHAR` is a fixed length string of text. 

This means that `VARCHAR (250)` can store any string of text that is up to 250 characters long, but the space is allocated depending on the length of the string e.g. if the string is 10 characters long, the space allocated is 10 bytes, if the string is 150 characters long, the space allocated is 150 bytes.

[![VARCHAR Data Type](https://assets.roadmap.sh/guest/varchar-alrdf.png)](https://assets.roadmap.sh/guest/varchar-alrdf.png)

On the other hand, `CHAR (250)` will **always** allocate 250 bytes of space for the string, regardless of the length of the string. For example, an 8 character string `John Doe` which is 8 bytes will still allocate 250 bytes of space.

[![CHAR Data Type](https://assets.roadmap.sh/guest/char-j6blz.png)](https://assets.roadmap.sh/guest/char-j6blz.png)

#### What happens if we store a string that is longer than the maximum length?

The behavior of the database in such cases depends on the database system. In MySQL, if we try to store a string that is longer than the maximum length, the database will truncate the string to the maximum length and store the truncated string while showing a warning.

### `FLOAT` vs `DOUBLE` for the `weight` column

The difference between `FLOAT` and `DOUBLE` data types in MySQL is that `FLOAT` occupies 32 bits of memory (4 bytes) and generally provides precision up to about 7 decimal digits, while `DOUBLE` occupies 64 bits of memory (8 bytes) and can achieve precision of about 15-16 decimal digits.

In our example, the weight values such as `73.99`, `65`, `92.06`, etc., have only up to 2 decimal places. Therefore, choosing `FLOAT` is more memory-efficient than `DOUBLE` while still maintaining sufficient accuracy for this use case.

---

In this lesson, we learned about the common data types and saw some examples to understand how to choose the appropriate data type for a column. While this is should give you a good starting point, there is a lot more to learn about data types and you should always refer to the documentation of the database you are using.

In the next lesson, we will learn more about the data types, look at MySQL specific data types and see how to use them in a table.