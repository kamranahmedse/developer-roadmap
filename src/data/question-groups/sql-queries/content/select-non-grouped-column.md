If you **SELECT** a column not in the **GROUP BY** clause, it will throw an error stating that the column must be in the **GROUP BY** clause or in an aggregate function. Let's use the table below as an illustration.

| firstName | lastName  | phoneNumber |
| --------- | --------- | ----------- |
| John      | Doe       | +23410910   |
| Jack      | Ray       | +23410911   |
| Irene     | Rotherdam | +23410911   |

If you run the query below against the database:

```sql
SELECT firstName, phoneNumber FROM phoneNumbers
GROUP BY phoneNumber
```

The result will be an error because `firstName` is not in the **GROUP BY** clause and not using an aggregate function. 