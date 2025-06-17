To join order details with corresponding customer information, you use a simple inner join:

```sql
SELECT o.*, c.name, c.email
FROM orders o
JOIN customers c ON o.customer_id = c.id;
```

This pulls all orders where a matching customer exists. If you need **every order**, even those without matching customers, switch to a LEFT JOIN:

```sql
SELECT o.*, c.name, c.email
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.id;
``` 