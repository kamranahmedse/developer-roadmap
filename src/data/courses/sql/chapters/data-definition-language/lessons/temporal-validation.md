---
title: Temporal Validation
description: Create a table for event scheduling with temporal constraints
order: 330
type: challenge
initSteps: []
expectedResults:
  - columns: [message]
    values:
      - ['Table created successfully']
---

You need to create a table named `events` for events hosted at the bookstore. The table should track event information using appropriate data types and constraints listed below.

| Column     | Data Type      | Constraints                                                            |
| ---------- | -------------- | ---------------------------------------------------------------------- |
| id         | `INTEGER`      | Primary Key                                                            |
| title      | `VARCHAR(100)` | Null values not allowed                                                |
| start_time | `TIMESTAMP`    | Null values not allowed. Also ensure `start_time` is always in future. |
| end_time   | `TIMESTAMP`    | Null values not allowed. Also ensure `end_time` is after `start_time`  |
| created_at | `TIMESTAMP`    | Not null and default `CURRENT_TIMESTAMP`                               |

Please note that you are being tested for your ability to work with temporal data. Make sure to add the following `CHECK` constraints apart from the other constraints mentioned in the table:

- `start_time` must be in the future
- `end_time` must be after `start_time`
- `created_at` must default to `CURRENT_TIMESTAMP`

> Also, please note that we are using PostgreSQL for our editor, so make sure to use the appropriate statements.

## Expected Output

After executing your query, the table should be created successfully with all specified columns and constraints.
