# DATEPART

`DATEPART` is a useful function in SQL that allows you to extract a specific part of a date or time field. You can use it to get the year, quarter, month, day of the year, day, week, weekday, hour, minute, second, or millisecond from any date or time expression.

Here's the basic syntax of `DATEPART`:

```sql
DATEPART(datepart, date)
```

Here `datepart` is the part of the date that you want to extract, and `date` is the date value from which the part should be extracted.

Here are some examples:

1. Extracting the year from a date:

```sql
SELECT DATEPART(year, '2021-07-14') AS 'Year';
```

In this example, it would return `2021`.

2. Extracting the month:

```sql
SELECT DATEPART(month, '2021-07-14') AS 'Month';
```

The result of this command would be `7`.

3. Extracting the day:

```sql
SELECT DATEPART(day, '2021-07-14') AS 'Day';
```

This would return `14`.

4. Extracting the hour, minute, or second from a datetime:

```sql
SELECT DATEPART(hour, '2021-07-14T13:30:15') AS 'Hour',
       DATEPART(minute, '2021-07-14T13:30:15') AS 'Minute',
       DATEPART(second, '2021-07-14T13:30:15') AS 'Second';
```

This would return `13`, `30`, and `15` respectively.

Remember, the `DATEPART` function returns an integer value. It is essential when you want to compare or group by a specific part of a date or time field in SQL.