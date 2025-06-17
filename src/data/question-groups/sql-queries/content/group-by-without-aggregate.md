If you use the **GROUP BY** clause without an aggregate function, it is equivalent to using the **DISTINCT** command. For example, the command below:

```sql
SELECT phoneNumber FROM phoneNumbers
GROUP BY phoneNumber
```

is equivalent to:

```sql
SELECT DISTINCT phoneNumber FROM phoneNumbers
``` 