# UPDATE

The `UPDATE` command in SQL is used to modify the existing records in a table. This command is useful when you need to update existing data within a database.

Here are important points to remember before updating records in SQL:

- The `WHERE` clause in the `UPDATE` statement specifies which records to modify. If you omit the `WHERE` clause, all records in the table will be updated!

- Be careful when updating records in SQL. If you inadvertently run an `UPDATE` statement without a `WHERE` clause, you will rewrite all the data in the table.

## SQL UPDATE Syntax

Here is a basic syntax of SQL UPDATE command:

```sql
UPDATE table_name
SET column1 = value1, column2 = value2...., columnN = valueN
WHERE [condition];
```

In this syntax:

- `table_name`: Specifies the table where you want to update records.
- `SET`: This keyword is used to set the column values.
- `column1, column2... columnN`: These are the columns of the table that you want to change.
- `value1, value2... valueN`: These are the new values that you want to assign for your columns.
- `WHERE`: This clause specifies which records need to be updated. It selects records based on one or more conditions.

## SQL UPDATE Example

Let's assume we have the following `Students` table:

| StudentID | FirstName | LastName | Age |
|-----------|-----------|----------|-----|
| 1         | John      | Doe      | 20  |
| 2         | Jane      | Smith    | 22  |
| 3         | Bob       | Johnson  | 23  |

And we want to update the `Age` of the student with `StudentID` as 2. We can use the `UPDATE` command as follows:

```sql
UPDATE Students
SET Age = 23
WHERE StudentID = 2;
```

After executing the above SQL command, the `Age` of the student with `StudentID` 2 will be updated to 23.

| StudentID | FirstName | LastName | Age |
|-----------|-----------|----------|-----|
| 1         | John      | Doe      | 20  |
| 2         | Jane      | Smith    | 23  |
| 3         | Bob       | Johnson  | 23  |