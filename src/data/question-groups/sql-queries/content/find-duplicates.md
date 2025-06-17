To find duplicate records, you must first define the criteria for detecting duplicates. Is it a combination of two or more columns where you want to detect the duplicates, or are you searching for duplicates within a single column?

The following steps will help you find duplicate data in a table.

- Use the **GROUP BY** clause to group all the rows by the column(s) on which you want to check the duplicate values.
- Use the **COUNT** function in the **HAVING** command to check if any groups have more than one entry.

Let's see how to handle single-column duplicates. In a table `Users`, there are three users who are 30 years of age. Let's use the **GROUP BY** clause and **COUNT** function to find the duplicate values.

```sql
SELECT Age, COUNT(Age)
FROM Users
GROUP BY Age
HAVING COUNT(Age) > 1
```

The result of the query looks like this:

| age | count |
| --- | ----- |
| 30  | 3     |

Handling multi-column (composite) duplicates is similar to handling single-column duplicates.

```sql
SELECT FirstName, LastName, COUNT(*) AS dup_count
FROM Users
GROUP BY FirstName, LastName
HAVING COUNT(*) > 1;
```

After finding duplicates, you might be asked how to delete the duplicates. The query to delete duplicates is shown below using Common Table Expression (CTE) and ROW_NUMBER().

```sql
WITH ranked AS (
  SELECT *,
         ROW_NUMBER() OVER (PARTITION BY Age ORDER BY id) AS rn
  FROM Users
)
DELETE FROM Users
WHERE id IN (
  SELECT id
  FROM ranked
  WHERE rn > 1
);
```

The query deletes all the duplicates while retaining the first row of data. 