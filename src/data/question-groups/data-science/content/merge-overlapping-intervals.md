To merge overlapping intervals, first sort them, then iterate and merge as needed:

```python
def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for current in intervals[1:]:
        last = merged[-1]
        if current[0] <= last[1]:
            last[1] = max(last[1], current[1])
        else:
            merged.append(current)
    return merged
```

Sorting takes O(n log n), and the merge step is linear, making this efficient for large datasets. 