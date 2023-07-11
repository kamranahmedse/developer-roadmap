# Aggregate Queries

SQL aggregate functions are inbuilt functions that are used to perform some calculation on the data and return a single value. This is why they form the basis for "aggregate queries". These functions operate on a set of rows and return a single summarized result.

## Common Aggregate Functions

**1. COUNT()**
   
Counts the number of rows. 
   ```
   SELECT COUNT(column_name) 
   FROM table_name 
   WHERE condition;
   ```
   
**2. SUM()**
   
Returns the sum of a numeric column.
   
   ```
   SELECT SUM(column_name) 
   FROM table_name 
   WHERE condition;
   ```

**3. AVG()**
   
Returns the average value of a numeric column.
   ```
   SELECT AVG(column_name) 
   FROM table_name 
   WHERE condition;
   ```

**4. MIN()**
   
Returns the smallest value of the selected column.
   ```
   SELECT MIN(column_name) 
   FROM table_name 
   WHERE condition;
   ```
   
**5. MAX()**
   
Returns the largest value of the selected column.
   ```
   SELECT MAX(column_name) 
   FROM table_name 
   WHERE condition;
   ```

These functions ignore NULL values.

## GROUP BY and HAVING Clauses

To separate the results into groups of accumulated data, you can use the GROUP BY clause.
   
```
SELECT column1, aggregate_function(column2)
FROM table
GROUP BY column1;
```

"A group" is represented by ROW(s) that have the same value in the specific column(s). The GROUP BY clause can be used in a SELECT statement to collect data across multiple records and group by some columns.

The HAVING clause is used with the GROUP BY clause, it applies to summarized group records, unlike the 'where' clause. It was added to SQL because the WHERE keyword could not be used with aggregate functions.
   
```sql
SELECT column1, aggregate_function(column2)
FROM table
GROUP BY column1
HAVING conditions;
```

## Conclusion

Aggregate queries are simply a way of summarizing information in your database. Although they are a powerful tool, they can become complex very quickly, especially if you start nesting them together or combining multiple aggregate functions in a single query. 

> Note: The real power of aggregate functions comes when you combine them with the WHERE or HAVING clause, allowing you to filter the data that you are summarizing.