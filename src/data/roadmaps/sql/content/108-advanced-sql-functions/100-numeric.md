# Numeric

SQL numeric functions are used to perform operations on numeric data types such as integer, decimal, and float. They're fundamental in manipulating data in SQL commands and are commonly used in `SELECT`, `UPDATE`, `DELETE` and `INSERT` statements.

## Examples of SQL Numeric Functions:

1. **ABS() Function:** This function returns the absolute (positive) value of a number. 

```sql
SELECT ABS(-243);
```
Output:

    243

2. **Avg() Function:** This function returns the average value of a column.

```sql
SELECT AVG(price) FROM products;
```

3. **COUNT() Function:** This function returns the number of rows that matches a specified criterion.

```sql
SELECT COUNT(productID) FROM products;
```

4. **SUM() Function:** This function returns the total sum of a numeric column.

```sql
SELECT SUM(price) FROM products;
```

5. **MIN() & MAX() Functions:** MIN() function returns the smallest value of the selected column, and MAX() function returns the largest value of the selected column.

```sql
SELECT MIN(price) FROM products;
SELECT MAX(price) FROM products;
```

6. **ROUND() Function:** This function is used to round a numeric field to the nearest integer, you can, however, specify the number of decimals to be returned.

```sql
SELECT ROUND(price, 2) FROM products;
```

7. **CEILING() Function:** This function returns the smallest integer which is greater than, or equal to, the specified numeric expression.

```sql
SELECT CEILING(price) FROM products;
```

8. **FLOOR() Function:** This function returns the largest integer which is less than, or equal to, the specified numeric expression.

```sql
SELECT FLOOR(price) FROM products;
```

9. **SQRT() Function:** This function returns the square root of a number.

```sql
SELECT SQRT(price) FROM products;
```

10. **PI() Function:** This function returns the constant Pi. 

```sql
SELECT PI();
```

These are just a few examples, SQL supports many more mathematical functions such as SIN, COS, TAN, COT, POWER, etc. Understanding and using these SQL numeric functions allows you to perform complex operations on the numeric data in your SQL tables.