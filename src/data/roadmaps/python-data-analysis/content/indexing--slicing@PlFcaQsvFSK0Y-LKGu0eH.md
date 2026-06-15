# Indexing & Slicing
 
Pandas provides two primary indexing systems: `.loc[]` for label-based selection and `.iloc[]` for position-based selection. Both work on rows, columns, or both simultaneously. Boolean indexing with a condition (e.g., `df[df['age'] > 30]`) is the most common way to filter rows.