To get the highest-spending customers, group by customer, sum their order totals, sort by that total, and limit the results:

```sql
SELECT customer_id, SUM(total_amount) AS revenue
FROM orders
GROUP BY customer_id
ORDER BY revenue DESC
LIMIT 5;
```

To add customer names, just join with the customers' table.

**Common pitfall:** Not grouping properly before ordering can result in incorrect aggregates. 