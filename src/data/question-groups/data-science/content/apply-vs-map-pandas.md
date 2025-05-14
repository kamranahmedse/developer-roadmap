- .map(): Works only on Series, applies a function element-wise
- .apply(): More versatile, works on both Series and DataFrames
- .applymap(): Applies a function to every element in a DataFrame

```python
# map - simple transformation of Series values
df['category'] = df['category_id'].map({1: 'Electronics', 2: 'Clothing'})

# apply on Series - more complex operations
df['name'] = df['name'].apply(lambda x: x.title())

# apply on DataFrame - process entire rows or columns
df.apply(lambda x: x.max() - x.min())

# applymap - element-wise operation on entire DataFrame
df.applymap(lambda x: f"{x:.2f}" if isinstance(x, float) else x)
``` 