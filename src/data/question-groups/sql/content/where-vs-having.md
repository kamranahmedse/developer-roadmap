You use **WHERE** for filtering rows before applying any grouping or aggregation. 
The code snippet below illustrates the use of **WHERE**. It filters the `Users` table for rows where the `Age` is greater than 18. 

```sql
SELECT * FROM Users
WHERE Age > 18;
```

The result of the query is similar to the table below.

| userId | firstName | lastName | age |
| ------ | --------- | -------- | --- |
| 1      | John      | Doe      | 30  |
| 2      | Jane      | Don      | 31  |
| 3      | Will      | Liam     | 25  |
| 4      | Wade      | Great    | 32  |
| 5      | Peter     | Smith    | 27  |

On the other hand, you use **HAVING** to filter groups after performing grouping and aggregation. You apply it to the result of aggregate functions, and it is mostly used with the **GROUP BY** clause.

```sql
SELECT FirstName, Age FROM Users
GROUP BY FirstName, Age
HAVING Age > 30;
```

The code above selects the `FirstName` and `Age` columns, then groups by the `FirstName` and `Age`, and finally gets entries with age greater than 30. The result of the query looks like this:

| firstName | age |
| --------- | --- |
| Wade      | 32  |
| Jane      | 31  |