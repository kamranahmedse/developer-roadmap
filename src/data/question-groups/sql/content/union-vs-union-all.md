Both combine results from two or more SELECT queries. The key difference is:

- `UNION` removes duplicate rows from a table.
- `UNION ALL` keeps all rows, including duplicates.

`UNION ALL` is faster because it skips the deduplication step. Use `UNION` when you want a clean list of unique values. 