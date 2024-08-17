# ORDER BY

The `ORDER BY` clause in SQL is used to sort the result-set from a SELECT statement in ascending or descending order. It sorts the records in ascending order by default. If you want to sort the records in descending order, you have to use the `DESC` keyword.

## Syntax for Ascending Order:
```sql
SELECT column1, column2, ...
FROM table_name
ORDER BY column1, column2, ... ASC;
```
Here, `ASC` is used for ascending order. If you use `ORDER BY` without `ASC` or `DESC`, `ASC` is used by default.

## Syntax for Descending Order:
```sql
SELECT column1, column2, ...
FROM table_name
ORDER BY column1, column2, ... DESC;
```
Here, `DESC` is used for descending order.

## Usage Example

Consider the following `Customers` table:

| ID | NAME  | AGE | ADDRESS   | SALARY |
|----|-------|-----|-----------|--------|
| 1  | Ramesh| 32  | Ahmedabad | 2000.0 |
| 2  | Khilan| 25  | Delhi     | 1500.0 |
| 3  | kaushik | 23 | Kota   | 2000.0 |
| 4  | Chaitali | 25 | Mumbai | 6500.0 |
| 5  | Hardik | 27 | Bhopal  | 8500.0 |
| 6  | Komal | 22 | MP       | 4500.0 |

**Example 1 - Ascending Order:**

Sort the table by the `NAME` column in ascending order:
```sql
SELECT * FROM Customers
ORDER BY NAME ASC;
```
**Example 2 - Descending Order:**

Sort the table by the `SALARY` column in descending order:
```sql
SELECT * FROM Customers
ORDER BY SALARY DESC;
```
**Example 3 - Multiple Columns:**

You can also sort by multiple columns. Sort the table by the `AGE` column in ascending order and then `SALARY` in descending order:
```sql
SELECT * FROM Customers
ORDER BY AGE ASC, SALARY DESC;
```
In this instance, the `ORDER BY` clause first sorts the `Customers` table by the `AGE` column and then sorts the sorted result further by the `SALARY` column.