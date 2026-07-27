# dense_rank

`dense_rank` is a window function that assigns a rank to each row within a partition of a result set, based on the order of rows. Unlike the `rank` function, `dense_rank` assigns consecutive ranks without gaps, even when there are ties in the ordering criteria. This means that if two or more rows have the same value for the ordering column(s), they will receive the same rank, and the next rank assigned will be the next consecutive integer, without skipping any numbers.

Visit the following resources to learn more:

- [@article@SQL DENSE_RANK](https://www.sqltutorial.org/sql-window-functions/sql-dense_rank/)
- [@article@Breaking Down DENSE_RANK](https://www.kdnuggets.com/breaking-down-denserank-a-step-by-step-guide-for-sql-enthusiasts)