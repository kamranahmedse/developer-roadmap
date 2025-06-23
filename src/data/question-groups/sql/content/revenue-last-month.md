```sql
SELECT 
  SUM(t.cost) AS total_revenue
FROM treatments t
JOIN appointments a ON t.appointment_id = a.appointment_id
WHERE a.appointment_date >= date_trunc('month', CURRENT_DATE - INTERVAL '1 month')
  AND a.appointment_date < date_trunc('month', CURRENT_DATE);
```

Say that you're using `date_trunc` to set a clean date range for last month, then joining appointments and treatments to add up the costs. This shows the hospital's treatment-related income for the previous month. 