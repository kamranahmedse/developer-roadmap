A **JOIN** combines data from two or more tables based on a related column between them. It is useful when you need to retrieve data spread across multiple tables in relational database management systems.

An **INNER JOIN** returns only rows with a match in both tables based on the specified join condition. If there are no matching rows, there will be no results. The SQL syntax for an **INNER JOIN** is shown in the code snippet below.

![Inner join vs. Left join](https://assets.roadmap.sh/guest/inner-join-vs-left-join-tifdp.png)

```sql
SELECT table1.column_name1, table1.column_name2, table2.column_name1, table2.column_name2 FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name
```

For example, there are two tables `Users` and `Cities` with the following data:

**Users table**

| userId | firstName | lastName | age | cityId |
| ------ | --------- | -------- | --- | ------ |
| 1      | John      | Doe      | 30  | 1      |
| 2      | Jane      | Don      | 31  | 1      |
| 3      | Will      | Liam     | 25  | 1      |
| 4      | Wade      | Great    | 32  | 1      |
| 5      | Peter     | Smith    | 27  | 2      |
| 6      | Rich      | Mond     | 30  | 2      |
| 7      | Rach      | Mane     | 30  | 2      |
| 8      | Zach      | Ridge    | 30  | 3      |

**Cities table**

| id | name       |
| -- | ---------- |
| 1  | London     |
| 2  | Manchester |

Let's say you want to retrieve a list of users and their respective city names. You can achieve this using the **INNER JOIN** query.

```sql
SELECT users.firstName, users.lastName, users.age, cities.name as cityName FROM users
INNER JOIN cities
ON users.cityId = cities.id
```

| firstName | lastName | age | cityName   |
| --------- | -------- | --- | ---------- |
| John      | Doe      | 30  | London     |
| Jane      | Don      | 31  | London     |
| Will      | Liam     | 25  | London     |
| Wade      | Great    | 32  | London     |
| Peter     | Smith    | 27  | Manchester |
| Rich      | Mond     | 30  | Manchester |
| Rach      | Mane     | 30  | Manchester |

**LEFT JOIN** returns all the rows from the left table (table 1) and the matched rows from the right table (table 2). If no matching rows exist in the right table (table 2), then NULL values are returned. The SQL syntax for a Left join is shown in the code snippet below.

```sql
SELECT table1.column_name1, table1.column_name2, table2.column_name1, table2.column_name2 FROM table1
LEFT JOIN table2
ON table1.column_name = table2.column_name 
```

Let's have a look at a practical example with `Users` and `Cities` tables from before.

When you execute the **LEFT JOIN** query, you get the table below.

| firstName | lastName | age | cityName   |
| --------- | -------- | --- | ---------- |
| John      | Doe      | 30  | London     |
| Jane      | Don      | 31  | London     |
| Will      | Liam     | 25  | London     |
| Wade      | Great    | 32  | London     |
| Peter     | Smith    | 27  | Manchester |
| Rich      | Mond     | 30  | Manchester |
| Rach      | Mane     | 30  | Manchester |
| Zach      | Ridge    | 30  | null       | 