```sql
SELECT COUNT(*) AS recent_patients
FROM patients
WHERE registration_date >= CURRENT_DATE - INTERVAL '6 months';
```

Say that you're filtering the patient records based on their `registration_date`, using a dynamic 6-month window. This way, the query always gives an up-to-date count. Point out that `COUNT(*)` gives you the total number of new patients. 