# lead

`LEAD` is a window function in SQL that provides access to a row at a specified offset after the current row within a partition. It's the counterpart to the `LAG` function, allowing you to look ahead in your dataset rather than behind. `LEAD` is useful for comparing current values with future values, calculating forward-looking metrics, or analyzing trends in sequential data. Like `LAG`, it takes arguments for the column to offset, the number of rows to look ahead (default is 1), and an optional default value when the offset exceeds the partition's boundary.

Learn more from the following resources:

- [@article@SQL LEAD](https://www.codecademy.com/resources/docs/sql/window-functions/lead)