You can find duplicates by grouping by the columns that should be unique, counting how many times each group appears, and filtering out any that appear more than once.

For example, you can find duplicate emails in a user table by grouping all rows by the email column.

```sql
SELECT email, COUNT(*)
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

This is useful during data cleaning or when validating records before import. 