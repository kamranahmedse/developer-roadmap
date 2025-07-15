To find your top customers *who also bought across multiple categories*, filter purchases within 3 months, group by customer, and apply category constraints with HAVING:

```sql
SELECT customer_id, SUM(amount) AS total_spent
FROM purchases
WHERE purchase_date >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
GROUP BY customer_id
HAVING COUNT(DISTINCT category_id) >= 3
ORDER BY total_spent DESC
LIMIT 5;
```

This makes sure each customer bought from **at least 3 categories**. WHERE filters rows **before** grouping, while HAVING filters groups **after**. 