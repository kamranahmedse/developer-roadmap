# FROM

The `FROM` clause in SQL specifies the tables from which the retrieval should be made. It is an integral part of `SELECT` statements and variants of `SELECT` like `SELECT INTO` and `SELECT WHERE`. `FROM` can be used to join tables as well. 

Typically, `FROM` is followed by space delimited list of tables in which the SELECT operation is to be executed. If you need to pull data from multiple tables, you would separate each table with a comma.

Here are some examples:

**Example 1 - Simple Usage**

If you've a table called `employees`, you can select all employees' data like this:

```sql
SELECT * 
FROM employees;
```
In this example, `*` means "all columns". So, `SELECT * FROM employees;` will retrieve all data from the `employees` table.

**Example 2 - FROM with Multiple Tables**

If you've multiple tables, say `employees` and `departments`, and you want to select data from both, you can do the following:

```sql
SELECT employees.name, departments.department 
FROM employees, departments 
WHERE employees.dept_id = departments.dept_id;
```

In this example, the `FROM` clause is following by two tables: `employees` and `departments`. `employees.name` and `departments.department` indicate that we're selecting the `name` column from the `employees` table and the `department` column from the `departments` table.

Remember, always respect the order of operations in SQL. The `FROM` clause works only after tables are identified. 

In complex SQL queries where you might need to pull data from multiple tables, aliases are used to temporarily rename the tables within the individual SQL statement. 

**Example 3 - FROM with Aliases**

Below is an example of a `FROM` clause with aliases:

```sql
SELECT e.name, d.department 
FROM employees AS e, departments AS d
WHERE e.dept_id = d.dept_id;
```

In this example, `employees` and `departments` tables are termed as `e` and `d` respectively. 

That's it! Remember that `FROM` is not limited only to `SELECT`. It is applicable to `UPDATE` and `DELETE` operations as well.