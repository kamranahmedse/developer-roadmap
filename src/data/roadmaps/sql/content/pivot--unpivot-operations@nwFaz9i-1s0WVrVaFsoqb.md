# Pivot and Unpivot Operations

## PIVOT

The PIVOT operator is used in SQL to rotate the table data from rows to columns, essentially transforming the data into a matrix format. This operator allows you to create a crosstab view of the data, with selected columns as rows and others as columns, providing a summary view. 

Here is a general example of the syntax:

```sql
SELECT ...
FROM ...
PIVOT (aggregate_function(column_to_aggregate)
    FOR column_to_pivot 
    IN (list_of_values))
```

__Example__: Let's assume we have a 'Sales' table with 'Year', 'Quarter' and 'Amount' columns. If we want to turn 'Quarter' values into columns, we might use:

```sql
SELECT * FROM 
(
  SELECT Year, Quarter, Amount
  FROM Sales
) 
PIVOT 
(
  SUM(Amount)
  FOR Quarter IN ('Q1' 'Q2' 'Q3' 'Q4')
)
```

This would give us each year as a row and each quarter as a column, with the total sales for each quarter in the cells.

## UNPIVOT

The UNPIVOT operator performs the reverse operation to PIVOT, rotating columns into rows. If the columns you're converting have a certain relationship, this can be factored into a single column instead.

Here is a general example of the syntax:

```sql
SELECT ...
FROM ...
UNPIVOT (column_for_values 
    FOR column_for_names IN (list_of_columns))
```

__Example__: Conversely, if we want to transform the quarter columns back into rows from the previous 'Sales' pivot table, we would use:

```sql
SELECT * FROM 
(
  SELECT Year, Q1, Q2, Q3, Q4
  FROM Sales
) 
UNPIVOT 
(
  Amount
  FOR Quarter IN (Q1, Q2, Q3, Q4)
)
```

This would result in each combination of year and quarter as a row, with the amount sold in that quarter as the 'Amount' column. Keep in mind, the UNPIVOTed data isn't equivalent to the original data as the original data might have had multiple rows for each year/quarter.