```sql
SELECT 
  a.appointment_id, 
  a.patient_id, 
  a.appointment_date
FROM appointments a
LEFT JOIN treatments t ON a.appointment_id = t.appointment_id
WHERE t.treatment_id IS NULL AND a.status = 'completed';
```

Say you're using a `LEFT JOIN` to find appointments without a matching treatment. Filtering for `treatment_id IS NULL` isolates those cases. Checking the appointment status keeps the focus on visits that actually happened. 