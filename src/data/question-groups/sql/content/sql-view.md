A **view** is a virtual table defined by a query. It simplifies complex joins or enforces read‑only access.

```sql
CREATE VIEW active_users AS
SELECT * FROM users WHERE status = 'active';
```

Views are useful when you want to abstract complexity from end users or create role-based access to specific slices of your data. 