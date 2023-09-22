# Date and Time

In SQL, the `DateTime` data type is used to work with dates and times. SQL Server comes with numerous functions for processing dates and times. Some of these include `GETDATE()`, `DATEDIFF()`, `DATEADD()`, `CONVERT()`, and so forth.

## GETDATE()

`GETDATE()` returns the current date and time as a DateTime datatype. It does not require any arguments.

```sql
SELECT GETDATE() AS CurrentDateTime;
```

## DATEDIFF()

`DATEDIFF()` returns the difference between two date values based on the unit of time you want to use. The syntax is `DATEDIFF(datepart, startdate, enddate)`.

```sql
SELECT DATEDIFF(day, '2022-01-01', '2022-01-15') AS DiffInDays;
```

## DATEADD()

`DATEADD()` adds or subtracts a specified time interval from a date. Its syntax is `DATEADD(datepart, number, date)`. 

```sql
SELECT DATEADD(year, 1, '2022-01-01') AS NewDate;
```

## CONVERT()

`CONVERT()` is used to convert from one data type to another, and it is commonly used to format DateTime values. Its syntax is `CONVERT(data_type(length), expression, style)`. 

```sql
SELECT CONVERT(VARCHAR(19), GETDATE()) AS FormattedDateTime;
```
Remember to replace `date` with your date in above queries.

## DateTime Format

By using appropriate format codes, SQL allows us to present dates and times in various formats.

```sql
SELECT FORMAT(GETDATE(), 'MM/dd/yyyy') AS DateFormatted;
```
Also, by using specific column names instead of `GETDATE()`, the same patterns can be applied to DateTime values in your data.

Note: All dates are stored as numeric values under the hood, with the integer portion representing the date and the decimal portion representing the time. Also, different database systems may use slightly different functions for handling dates and times, so be sure to check the documentation for your specific DBMS.