# rank

The `RANK` function in SQL is a window function that assigns a rank to each row within a partition of a result set, based on the order specified by the `ORDER BY` clause. Unlike the `ROW_NUMBER` function, `RANK` allows for the possibility of ties—rows with equal values in the ordering column(s) receive the same rank, and the next rank is skipped accordingly. For example, if two rows share the same rank of 1, the next rank will be 3. This function is useful for scenarios where you need to identify relative positions within groups, such as ranking employees by salary within each department.

Learn more from the following resources:

- [@article@Overview of SQL RANK Functions](https://www.sqlshack.com/overview-of-sql-rank-functions/)
- [@video@RANK, DENSE_RANK, ROW_NUMBER SQL Analytical Functions Simplified](https://www.youtube.com/watch?v=xMWEVFC4FOk)