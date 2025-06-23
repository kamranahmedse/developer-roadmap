Since NULL is unknown, a `NOT IN` query containing a NULL or NULL in the list of possible values will always return 0 records because of the unknown result introduced by the NULL value. SQL cannot determine for sure whether the value is not in that list.

Let's illustrate this using a table `Sales` that looks like this:

| id | day       | amount |
| -- | --------- | ------ |
| 1  | Monday    | 200    |
| 2  | Tuesday   | 300    |
| 3  | Wednesday | 600    |
| 4  | Thursday  | 390    |
| 5  | Friday    | 900    |
| 6  | Saturday  | 600    |

If you run the query below, it will return an empty result because SQL cannot determine if the value is not in the list because nothing equals or doesn't equal NULL.

```sql
SELECT * from sales
WHERE amount NOT IN (200, 300, 600, NULL);
``` 