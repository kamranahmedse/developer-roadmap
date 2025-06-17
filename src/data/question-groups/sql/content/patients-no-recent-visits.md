```sql
SELECT 
  p.patient_id, 
  p.first_name, 
  p.last_name
FROM patients p
LEFT JOIN (
  SELECT patient_id, MAX(appointment_date) AS last_visit
  FROM appointments
  GROUP BY patient_id
) a ON p.patient_id = a.patient_id
WHERE last_visit IS NULL OR last_visit < CURRENT_DATE - INTERVAL '1 year';
```

Walk through how you first create a subquery to find each patient's most recent appointment. Then, join that with the patient table and filter for those who haven't visited in over a year, or never visited at all. 