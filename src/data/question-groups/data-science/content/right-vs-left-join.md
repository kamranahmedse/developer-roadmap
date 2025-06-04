A RIGHT JOIN is the same as a LEFT JOIN with the table order reversed:

```sql
SELECT * FROM A RIGHT JOIN B ON A.id = B.id;
SELECT * FROM B LEFT JOIN A ON A.id = B.id;
``` 