---
title: Customer Contact List
description: Practice using string and conversion functions to standardize customer contact information
order: 210
type: challenge
setup: |
  ```sql
  CREATE TABLE customer (
      id INT PRIMARY KEY,
      first_name VARCHAR(50),
      last_name VARCHAR(50),
      email VARCHAR(255),
      phone VARCHAR(20)
  );

  INSERT INTO customer (id, first_name, last_name, email, phone) VALUES
      (1, 'john', 'DOE', 'JOHN.DOE@email.com', '  555-123-4567  '),
      (2, 'JANE', 'smith', 'jane.smith@email.com', '555.123.4568'),
      (3, 'Bob', 'WILSON', 'bob.wilson@email.com', '5551234569'),
      (4, 'ALICE', 'brown', 'alice.b@email.com', NULL),
      (5, 'charlie', 'DAVIS', 'charlie.d@email.com', '555-123-4570');
  ```
---

The bookstore is updating their customer contact list and needs to standardize how customer information is displayed. They want all names properly capitalized, emails in lowercase, and phone numbers in a consistent format.

Given the following data in table `customer`

| id  | first_name | last_name | email                | phone        |
| --- | ---------- | --------- | -------------------- | ------------ |
| 1   | john       | DOE       | JOHN.DOE@email.com   | 555-123-4567 |
| 2   | JANE       | smith     | jane.smith@email.com | 555.123.4568 |
| 3   | Bob        | WILSON    | bob.wilson@email.com | 5551234569   |
| 4   | ALICE      | brown     | alice.b@email.com    | NULL         |
| 5   | charlie    | DAVIS     | charlie.d@email.com  | 555-123-4570 |

Write a query that formats the customer information according to these requirements:

- Full name (first name and last name properly capitalized)
- Email address (in lowercase)
- Phone number (Numbers only, or `No phone` if `NULL`)

## Expected Output

You output should look like this:

| full_name     | email                | phone      |
| ------------- | -------------------- | ---------- |
| John Doe      | john.doe@email.com   | 5551234567 |
| Jane Smith    | jane.smith@email.com | 5551234568 |
| Bob Wilson    | bob.wilson@email.com | 5551234569 |
| Alice Brown   | alice.b@email.com    | No phone   |
| Charlie Davis | charlie.d@email.com  | 5551234570 |

> **Hint:** Use the `REGEXP_REPLACE` function to remove non-numeric characters from the phone number. Use the `g` flag to replace all occurrences of the pattern.

## Solution

```sql
SELECT
    CONCAT(
        INITCAP(first_name),
        ' ',
        INITCAP(last_name)
    ) as full_name,
    LOWER(email) as email,
    COALESCE(
        REGEXP_REPLACE(
            TRIM(phone),
            '[^0-9]',
            '',
            'g'
        ),
        'No phone'
    ) as phone
FROM customer
ORDER BY id;
```
