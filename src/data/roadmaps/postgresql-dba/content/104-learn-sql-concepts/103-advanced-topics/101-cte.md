# Common Table Expressions (CTEs)

A Common Table Expression, also known as CTE, is a named temporary result set that can be referenced within a `SELECT`, `INSERT`, `UPDATE`, or `DELETE` statement. CTEs are particularly helpful when dealing with complex queries, as they enable you to break down the query into smaller, more readable chunks. 

## Syntax

The basic syntax for a CTE is as follows:

```sql
WITH cte_name (column_name1, column_name2, ...)
AS (
    -- CTE query goes here
)
-- Main query that references the CTE
```

## Simple Example

Here is a simple example illustrating the use of a CTE:

```sql
WITH employees_over_30 (name, age) 
AS (
    SELECT name, age 
    FROM employees 
    WHERE age > 30
)
SELECT * 
FROM employees_over_30;
```

In this example, we create a CTE called `employees_over_30`, which contains the name and age of employees who are older than 30. We then reference this CTE in our main query to get the desired results.

## Recursive CTEs

One powerful feature of CTEs is the ability to create recursive queries. Recursive CTEs make it easier to work with hierarchical or tree-structured data. The basic syntax for a recursive CTE is as follows:

```sql
WITH RECURSIVE cte_name (column_name1, column_name2, ...)
AS (
    -- Non-recursive term
    SELECT ...
    UNION ALL
    -- Recursive term
    SELECT ...
    FROM cte_name
)
-- Main query that references the CTE
```

A recursive CTE consists of two parts: the non-recursive term and the recursive term, combined using the `UNION ALL` clause. The non-recursive term acts as the base case, while the recursive term is used to build the hierarchy iteratively.

## Recursive Example

Here's an example of a recursive CTE that calculates the factorial of a number:

```sql
WITH RECURSIVE factorial (n, fact) 
AS (
    -- Non-recursive term
    SELECT 1, 1
    UNION ALL
    -- Recursive term
    SELECT n + 1, (n + 1) * fact
    FROM factorial
    WHERE n < 5
)
SELECT * 
FROM factorial;
```

In this example, the non-recursive term initializes the `n` and `fact` columns with the base case of `1` and `1`. The recursive term calculates the factorial of each incremented number up to `5`. The final query returns the factorial of each number from `1` to `5`.

## Key Takeaways

- CTEs help to break down complex queries into smaller, more readable parts.
- CTEs can be used in `SELECT`, `INSERT`, `UPDATE`, and `DELETE` statements.
- Recursive CTEs are helpful when working with hierarchical or tree-structured data.