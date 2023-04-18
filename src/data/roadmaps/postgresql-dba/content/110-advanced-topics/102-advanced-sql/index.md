# Advanced SQL

### Advanced SQL

As a PostgreSQL DBA, you will often encounter complex tasks that require a deeper understanding of SQL. In this section, we will cover some essential advanced SQL concepts that can help you manage your PostgreSQL database with greater efficiency and proficiency. You will learn about:

1. **Window Functions:** Window functions allow you to perform calculations across a set of rows related to the current row. This enables you to create more advanced calculations and aggregations. For instance, calculating a moving average or ranking the results.

   * `ROW_NUMBER()`: Assigns a unique number to each row within the result set.
   * `RANK()` and `DENSE_RANK()`: Assigns a unique rank to each distinct row within the result set.
   * `NTILE(n)`: Divides the result set into a specified number of buckets (n) and assigns a bucket number to each row.
   * `LAG()` and `LEAD()`: Accesses data from a previous or following row within the result set.
   * `FIRST_VALUE()` and `LAST_VALUE()`: Returns the first or last value within the defined window frame.

2. **Common Table Expressions (CTEs):** CTEs allow you to write clean and organized SQL queries by breaking them down into smaller, more readable chunks. They can be used to create temporary tables, simplify complex queries, and write recursive queries.

   Example: 
   ```
   WITH temp_data AS (
       SELECT 
           payment_date,
           sum(amount) as daily_total
       FROM
           payment
       GROUP BY
           payment_date
   )
   SELECT
       payment_date,
       daily_total
   FROM
       temp_data
   WHERE
       daily_total > 100;
   ```

3. **Pivot Tables:** Pivot tables allow you to efficiently summarize and analyze large amounts of data by transposing row data into columns and aggregating it. The `crosstab` function in the `tablefunc` module can be used to create pivot tables in PostgreSQL.

4. **JSON Functions:** With PostgreSQL's extensive support for JSON data types, you can create, extract, modify and query JSON data using various JSON functions and operators.

   * `->`: Extract JSON value by key.
   * `->>`: Extract JSON value by key and return it as text.
   * `#>`: Extract JSON value by key or index path.
   * `#>>`: Extract JSON value by key or index path and return it as text.
   * `json_array_length()`: Get the length of a JSON array.
   * `json_each()`, `json_each_text()` and `json_object_keys()`: Extract keys and values from a JSON object.

That's a brief summary of some critical advanced SQL topics. By mastering these concepts, you will be better equipped to handle the challenges of managing your PostgreSQL database. Keep honing your SQL skills, and always keep learning!