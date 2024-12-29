---
title: Constraints Challenge
description: Create a table for bookstore inventory using various SQL constraints
order: 320
type: challenge
initSteps: []
expectedResults:
  - columns: [message]
    values:
      - ['Table created successfully']
---

You need to create a table named `book_inventory` for a bookstore system. The table should track detailed information about books using appropriate data types and constraints listed below.

| Column       | Data Type        | Constraints                                  |
| ------------ | ---------------- | -------------------------------------------- |
| id           | `INTEGER`        | Primary Key                                  |
| isbn         | `VARCHAR(13)`    | Null values not allowed and must be unique   |
| title        | `VARCHAR(200)`   | Null values not allowed                      |
| author       | `VARCHAR(100)`   | Null values not allowed                      |
| price        | `DECIMAL(10, 2)` | Null values not allowed and must be positive |
| pages        | `INTEGER`        | Must be positive                             |
| in_stock     | `BOOLEAN`        | Not null and default true                    |
| publish_year | `INTEGER`        | Not null                                     |
| last_updated | `TIMESTAMP`      | Not null and default `CURRENT_TIMESTAMP`     |

## Expected Output

After executing your query, the table should be created successfully with all specified columns and constraints.

## Notes

This challenge tests your knowledge of:

- SQL data types (INTEGER, VARCHAR, DECIMAL, BOOLEAN, DATE, TIMESTAMP)
- Primary key and unique constraints
- NOT NULL constraints
- DEFAULT values
- CHECK constraints for data validation
- Working with date and time data types
