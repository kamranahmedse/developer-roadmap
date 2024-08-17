# dense_rank

`DENSE_RANK` is a window function in SQL that assigns a rank to each row within a window partition, with no gaps in the ranking numbers. 

Unlike the `RANK` function, `DENSE_RANK` does not skip any rank (positions in the order). If you have, for example, 1st, 2nd, and 2nd, the next rank listed would be 3rd when using `DENSE_RANK`, whereas it would be 4th using the `RANK` function. The `DENSE_RANK` function operates on a set of rows, called a window, and in that window, values are compared to each other.

Learn more from the following resources:

- [@article@SQL DENSE_RANK](https://www.sqltutorial.org/sql-window-functions/sql-dense_rank/)