SQL is a **declarative** language. You tell the database *what* you want (for example, "Get me a list of all active customers") without writing out the step-by-step logic to retrieve it. The database engine figures out how to execute your request.

In contrast, languages like Java or Python are **imperative**; you write code that explains *how* to do something, including loops, conditions, and memory management.

![SQL vs. other programming language](https://assets.roadmap.sh/guest/sql--vs-other-programming-language-qzfiy.png)

```sql
-- Declarative: I want all active customers
SELECT * 
FROM customers 
WHERE status = 'active';
``` 