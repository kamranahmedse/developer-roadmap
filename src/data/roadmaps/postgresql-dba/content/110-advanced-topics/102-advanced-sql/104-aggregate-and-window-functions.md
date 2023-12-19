# Aggregate and Window Functions

In this section, we'll dive deep into aggregate and window functions, which are powerful tools in constructing advanced SQL queries. These functions help you to perform operations on a set of rows and return one or multiple condensed results.

## Aggregate Functions

Aggregate functions are used to perform operations on a group of rows, like calculating the sum, average, or count of the rows, and returning a single result. Common aggregate functions include:

- `SUM`: Calculates the total sum of the values in the column
- `AVG`: Calculates the average of the values in the column
- `MIN`: Finds the minimum value in the column
- `MAX`: Finds the maximum value in the column
- `COUNT`: Counts the number of rows (or non-null values) in the column

Aggregate functions are commonly used with the `GROUP BY` clause to group rows by one or more columns. Here's an example that calculates the total sales per product:

```sql
SELECT product_id, SUM(sales) AS total_sales
FROM sales_data
GROUP BY product_id;
```

## Window Functions

Window functions are similar to aggregate functions in that they operate on a group of rows. However, instead of returning a single result for each group, window functions return a result for each row, based on its "window" of related rows.

Window functions are usually used with the `OVER()` clause to define the window for each row. The window can be defined by `PARTITION BY` and `ORDER BY` clauses within the `OVER()` clause.

Window functions can be used with the following types of functions:

- Aggregate functions (e.g., `SUM`, `AVG`, `MIN`, `MAX`, `COUNT`)
- Ranking functions (e.g., `RANK`, `DENSE_RANK`, `ROW_NUMBER`)
- Value functions (e.g., `FIRST_VALUE`, `LAST_VALUE`, `LAG`, `LEAD`)

Here's an example that calculates the cumulative sum of sales per product, ordered by sale date:

```sql
SELECT product_id, sale_date, sales,
       SUM(sales) OVER (PARTITION BY product_id ORDER BY sale_date) AS cumulative_sales
FROM sales_data;
```

In this example, the `SUM(sales)` aggregate function is used with the `OVER()` clause to create a window for each row, partitioned by `product_id` and ordered by `sale_date`. This allows you to calculate the cumulative sum of sales for each product up to the current row.

## Conclusion

Understanding and using aggregate and window functions is essential to perform advanced data analysis with SQL. By mastering the use of these functions, you can create complex SQL queries to efficiently analyze your data and make better-informed decisions. So, keep practicing and exploring different combinations of functions and window definitions to sharpen your skills!