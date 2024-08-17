# lag

`LAG` is a window function in SQL that provides access to a row at a specified offset prior to the current row within a partition. It allows you to compare the current row's values with previous rows' values without using self-joins. LAG is particularly useful for calculating running differences, identifying trends, or comparing sequential data points in time-series analysis. The function takes the column to offset, the number of rows to offset (default is 1), and an optional default value to return when the offset goes beyond the partition's boundary.

Learn more from the following resources:

- [@article@Understanding the LAG function in SQL](https://www.datacamp.com/tutorial/sql-lag)