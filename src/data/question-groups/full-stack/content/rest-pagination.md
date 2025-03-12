Adding pagination to a RESTful API can be done in multiple ways, but assuming a standard implementation, the best option is to go with query parameters.

**Query Parameters**: Using `limit` and `offset` (or `page` and `size`).  

```
GET /api/items?limit=10&offset=20
```

**Back-End Implementation**:

In the backend, we’re turn those query params into something like:

**SQL code:**  
```sql
SELECT * FROM items LIMIT 10 OFFSET 20;
```

**In code:**  
```javascript
const items = await db.find().skip(offset).limit(limit);
res.json({ data: items });
```

##### Metadata

Include total count and current page in the response for better UX.

```json
{ 
  "data": [...], 
  "total": 100,
  "page": 3,
  "size": 10 
}
```