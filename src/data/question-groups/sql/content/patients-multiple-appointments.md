```sql
SELECT 
  p.patient_id, 
  p.first_name, 
  p.last_name, 
  COUNT(a.appointment_id) AS total_appointments
FROM patients p
JOIN appointments a ON p.patient_id = a.patient_id
GROUP BY p.patient_id, p.first_name, p.last_name
HAVING COUNT(a.appointment_id) > 3;
```

Talk about how you're using a `JOIN` to connect patients to their appointments, then grouping the results to count how many appointments each patient had. Use `HAVING` to filter for those with more than three. This kind of query helps track highly engaged or frequent patients. 