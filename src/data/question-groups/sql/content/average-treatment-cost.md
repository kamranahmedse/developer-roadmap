```sql
SELECT 
  appointment_id, 
  AVG(cost) AS avg_treatment_cost
FROM treatments
GROUP BY appointment_id;
```

Mention that treatments are tied to appointments, so grouping by `appointment_id` lets you calculate the average cost for each visit. This kind of breakdown could help with billing or identifying unusually expensive sessions. 