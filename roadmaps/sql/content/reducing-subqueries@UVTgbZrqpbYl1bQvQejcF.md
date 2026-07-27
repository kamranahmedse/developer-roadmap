# Reducing Subqueries

Reducing subqueries is a common SQL optimization technique, especially when dealing with complex logic or large datasets. Correlated subqueries, which are evaluated once for each row in the outer query, can degrade the performance. Subqueries can often be replaced with JOIN operations. In cases where subqueries are reused, consider replacing them with Common Table Expressions (CTEs), which offer modularity and avoid repeated executions of the same logic. Limiting the result set returned by subqueries and storing the results of expensive subqueries in temporary tables for reuse can also improve performance.

Learn more from the following resources: