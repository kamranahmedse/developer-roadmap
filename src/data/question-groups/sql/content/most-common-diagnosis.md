```sql
SELECT 
  diagnosis, 
  COUNT(*) AS diagnosis_count
FROM appointments
WHERE diagnosis IS NOT NULL
GROUP BY diagnosis
ORDER BY diagnosis_count DESC
LIMIT 1;
```

Mention that you're excluding `NULL` values since they don't represent valid data, then grouping by diagnosis to see which one appears the most. Sorting in descending order and limiting to 1 gives you the most frequent condition. 