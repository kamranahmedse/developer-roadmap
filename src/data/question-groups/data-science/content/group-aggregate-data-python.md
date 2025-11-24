Basic group and sum:

```python
df.groupby('category')['sales'].sum()
```

For more complex aggregations:

```python
# Multiple aggregations
df.groupby('category').agg({
    'sales': ['sum', 'mean', 'count'],
    'profit': ['min', 'max']
})

# Custom aggregation functions
df.groupby('category')['sales'].agg(lambda x: x.max() - x.min())

# Reset index to convert back to a regular DataFrame
df.groupby('category')['sales'].sum().reset_index()
``` 