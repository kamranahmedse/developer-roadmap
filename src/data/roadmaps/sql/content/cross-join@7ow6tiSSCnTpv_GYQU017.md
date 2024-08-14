# Cross Join

A `CROSS JOIN` is a SQL operation that returns the Cartesian product of two tables. In other words, it combines each row from the first table with every row from the second table. This type of join can be particularly useful when you want to combine all possible pairs of rows from two tables, such as when generating combinations.

Unlike other types of joins, a `CROSS JOIN` does not require any condition to match rows. Instead, it simply pairs each row from the first table with each row from the second table.

## Syntax of a Cross Join

Here is the basic syntax for a `CROSS JOIN` statement:

```sql
SELECT a.column_name, b.column_name
FROM table_name1 AS a
CROSS JOIN table_name2 AS b;
```

In this query:

- `table_name1` and `table_name2`: are the names of the tables to join.
- `a` and `b`: are aliases for these tables.
- `column_name`: specify the columns that should be returned as a result of the SQL `CROSS JOIN` statement.

## Example of a Cross Join

Let us consider two tables, `COLORS` and `SIZES`, with the following structures:

**COLORS Table:**

| ColorID | Color  |
|---------|--------|
| 1       | Red    |
| 2       | Blue   |
| 3       | Green  |

**SIZES Table:**

| SizeID | Size  |
|--------|-------|
| 1      | Small |
| 2      | Medium|
| 3      | Large |

If you want to create a list of all possible combinations of colors and sizes, you can use a `CROSS JOIN`:

```sql
SELECT a.Color, b.Size
FROM COLORS a
CROSS JOIN SIZES b;
```

This query will return every possible pair of colors and sizes, giving you a full set of combinations:

| Color | Size   |
|-------|--------|
| Red   | Small  |
| Red   | Medium |
| Red   | Large  |
| Blue  | Small  |
| Blue  | Medium |
| Blue  | Large  |
| Green | Small  |
| Green | Medium |
| Green | Large  |

This result is the Cartesian product of the `COLORS` and `SIZES` tables, which is the essence of a `CROSS JOIN`.

- [@article@CROSS JOIN](https://www.w3schools.com/mysql/mysql_join_cross.asp)