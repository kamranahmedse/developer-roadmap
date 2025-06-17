**NTILE()** is a window function that divides rows into a pre-defined number of roughly equal groups. It's like breaking your data into different sets based on your defined criteria. For example, let's say you have some student scores from 1 to 100; you can use the **NTILE()** function to categorize the scores into different groups or buckets. 

The syntax of the `NTILE()` function is:

```sql
NTILE(n) OVER (ORDER BY some_column)
```

- n: represents the number of groups you want to divide your rows into.
- ORDER BY: defines the order of the rows in each group where the function is applied.

 
Let's see a practical example using a table `Scores`. The table stores students' scores on a test. We will see how to use the **NTILE()** function.

| userId | score |
| ------ | ----- |
| 1      | 78    |
| 2      | 70    |
| 3      | 90    |
| 4      | 98    |
| 5      | 60    |
| 6      | 88    |
| 7      | 100   |
| 8      | 66    |

The query using the **NTILE()** function looks like this:

```sql
SELECT
  id,
  score,
  NTILE(3) OVER (ORDER BY score DESC) AS category
FROM scores;
```

| userId | score | category |
| ------ | ----- | -------- |
| 7      | 100   | 1        |
| 4      | 98    | 1        |
| 3      | 90    | 1        |
| 6      | 88    | 2        |
| 1      | 78    | 2        |
| 2      | 70    | 2        |
| 8      | 66    | 3        |
| 5      | 60    | 3        |

The **NTILE()** function is useful in data analysis because it can detect outliers in a data set and create histograms of data. It can also create percentiles and quartiles for data distribution. 