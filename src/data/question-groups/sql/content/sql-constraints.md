SQL constraints are rules that help keep data accurate and consistent.

- `NOT NULL`: Prevents a column from having empty values.
- `UNIQUE`: Makes sure all values in a column are different.
- `CHECK`: Adds a condition that the values in a column must meet.

**Use case**: If you're storing product prices, you can use a `CHECK` constraint to prevent negative values as shown in the snippet below:

```sql
CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) CHECK (price >= 0)
);
``` 