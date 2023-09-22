# GROUP BY

"Group By" is a clause in SQL that is used to arrange identical data into groups. This clause comes under the category of Group Functions, alongside the likes of Count, Sum, Average, etc.

The syntax for 'Group by' is:

```sql
SELECT column1, column2
FROM table_name
GROUP BY column1, column2;
```

Here, column1, column2, are the names of the columns based on which we want to group the results.

## Example:

Assume we have a "Sales" table. This table has three columns: ID, Item, and Amount.

```sql
ID     Item    Amount
---   ------   ------
1      A        150
2      B        200
3      A        100
4      B        50
5      A        200
6      A        100
7      B        150
```

Execute the following SQL statement...

```sql
SELECT Item, SUM(Amount)
FROM Sales
GROUP BY Item;
```

This will concatenate, or "group", all items that are the same into one row, applying the SUM() function on their respective Amounts. The output will then be:

```sql
Item    SUM(Amount)
------  ----------
A        550
B        400
```

## Group By with Having Clause

The Group By clause can also be used with the Having keyword. The Having keyword allows you to filter the results of the group function.

For example:

```sql
SELECT Item, SUM(Amount)
FROM Sales
GROUP BY Item
HAVING SUM(Amount) > 150;
```

This will return all grouped items where the total amount is more than 150. Hence, the result will be:

```sql
Item    SUM(Amount)
------  ----------
A        550
B        400
```