Basic null handling options:

```python
df.fillna(0)      # Replace with 0  
df.dropna()       # Drop rows with nulls
```

Other methods to consider:

```python
# Fill with mean/median/mode
df['column'].fillna(df['column'].mean())
df['column'].fillna(df['column'].median())
df['column'].fillna(df['column'].mode()[0])

# Forward/backward fill
df.fillna(method='ffill')  # Use previous value
df.fillna(method='bfill')  # Use next value

# Interpolation
df.interpolate()
``` 