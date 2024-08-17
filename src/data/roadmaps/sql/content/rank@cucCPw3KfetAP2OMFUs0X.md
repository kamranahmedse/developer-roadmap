# rank

`RANK()` is a window function in SQL that assigns a unique rank to each distinct row within a partition of a result set. The rank of the first row within each partition is one. The `RANK()` function adds the number of tied rows to the tied rank to calculate the next rank. So the ranks may not be consecutive numbers.

## Parameters of RANK Function

There are no arguments for the `RANK()` function. However, since it's a window function, the function operates on a set of rows (window) defined by the `OVER` clause, which is mandatory. 

## Syntax 

The syntax of `RANK` function is:

```sql
RANK () OVER (
    [PARTITION BY column_1, column_2,…]
    ORDER BY column_3,column_4,… 
)
```

`PARTITION BY`: This clause divides the rows into multiple groups or partitions upon which the `RANK()` function is applied.

`ORDER BY`: This clause sorts the rows in each partition.

If `PARTITION BY` is not specified, the function treats all rows in the result set as a single partition. 

## Examples

Here's an example query using the `RANK()` function:

```sql
SELECT
    product_name, 
    brand, 
    RANK () OVER (
    PARTITION BY brand
    ORDER BY product_name ASC
) Product_rank
FROM
    products;
```

In this example, it generates a list of products, grouped by brand, and ranked by product_name within each brand. The `product_name` with the smallest value (alphabetically first when sorting ASC) gets a rank of 1 within its partition.

## Important Notes
- `RANK()` function may return duplicate rankings if the column on which the function is applied contains duplicate values.
- The `RANK()` function will leave a gap and create a non-consecutive ranking if there are equal rankings (ties).
- `RANK()` function offers a very efficient way to solve top-N problems.
  

You might also be interested in looking at other similar ranking functions in SQL like `DENSE_RANK()`, `ROW_NUMBER()`, etc.