The difference is that **COUNT(*)** counts all the rows of data, including NULL values, while **COUNT(column_name)** counts only non-NULL values in the specified column. Let's illustrate this using a table named `Users`.

| userId | firstName | lastName | age | country  |
| ------ | --------- | -------- | --- | -------- |
| 1      | John      | Doe      | 30  | Portugal |
| 2      | Jane      | Don      | 31  | Belgium  |
| 3      | Zach      | Ridge    | 30  | Norway   |
| 4      | null      | Tom      | 25  | Denmark  |

If you use **COUNT(*)**, the result will be 4 but if you use **COUNT(firstName)**, it will return 3, omitting the null value. 