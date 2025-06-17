To remove duplicates from a DataFrame:
```python
df = df.drop_duplicates()
```
You can also refine this by specifying columns:

```python
# Drop duplicates based on specific columns
df = df.drop_duplicates(subset=['customer_id', 'product_id'])
```

Control which duplicates to keep:

```python
# Keep first or last occurrence
df = df.drop_duplicates(keep='last')  # or 'first'
``` 