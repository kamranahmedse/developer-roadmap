```sql
SELECT 
  d.full_name, 
  COUNT(DISTINCT a.patient_id) AS unique_patients
FROM doctors d
JOIN appointments a ON d.doctor_id = a.doctor_id
GROUP BY d.full_name
ORDER BY unique_patients DESC
LIMIT 1;
```

Explain that `COUNT(DISTINCT patient_id)` helps you avoid counting the same patient twice. Ordering by the count and limiting the result to 1 gives you the doctor who's seen the widest variety of patients. 