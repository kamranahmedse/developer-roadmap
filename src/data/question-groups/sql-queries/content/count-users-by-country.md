Given a table `Users` that looks like this:

| userId | firstName | lastName | age | country   |
| ------ | --------- | -------- | --- | --------- |
| 1      | John      | Doe      | 30  | Portugal  |
| 2      | Jane      | Don      | 31  | Belgium   |
| 3      | Will      | Liam     | 25  | Argentina |
| 4      | Wade      | Great    | 32  | Denmark   |
| 5      | Peter     | Smith    | 27  | USA       |
| 6      | Rich      | Mond     | 30  | USA       |
| 7      | Rach      | Mane     | 30  | Argentina |
| 8      | Zach      | Ridge    | 30  | Portugal  |

The query to **COUNT** the number of users by country is:

```sql
SELECT country, COUNT(country) FROM users
GROUP BY country
```

The query uses the **GROUP BY** clause to group the users by country and then shows the count in the next column. The result of the query looks like this:

| country   | count |
| --------- | ----- |
| USA       | 2     |
| Portugal  | 2     |
| Argentina | 2     |
| Belgium   | 1     |
| Denmark   | 1     | 