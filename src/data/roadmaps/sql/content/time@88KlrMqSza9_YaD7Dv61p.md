# TIME

In SQL, TIME data type is used to store time values in the database. It allows you to store hours, minutes, and seconds. The format of a TIME is 'HH:MI:SS'.

## Syntax 

Here is the basic syntax to create a field with TIME data type in SQL:
```sql
CREATE TABLE table_name (
    column_name TIME
);
```

You can store data using the following syntax:
```sql
INSERT INTO table_name (column_name) values ('17:34:20');
```

## Range

The time range in SQL is '00:00:00' to '23:59:59'.

## Fetching Data 

To fetch the data you can use the SELECT statement. For example:

```sql
SELECT column_name FROM table_name;
```
It will return the time values from the table.

## Functions 

SQL provides several functions to work with the TIME data type. Some of them include:

## CURTIME()

Return the current time.
```sql
SELECT CURTIME();
```

## ADDTIME()

Add time values.
```sql
SELECT ADDTIME('2007-12-31 23:59:59','1 1:1:1');
```

## TIMEDIFF()

Subtract time values.
```sql
SELECT TIMEDIFF('2000:01:01 00:00:00', '2000:01:01 00:01:01');
```

## Conversion

Conversion of TIME data type is also possible in SQL. It can be converted into other data types, like INT, and vice versa. Here is a conversion example of TIME to INT:

```sql
SELECT TIME_TO_SEC('22:23:00');
```

This was a brief summary about "TIME" in SQL.