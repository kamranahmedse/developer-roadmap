When I combine data from different sources with inconsistent formats, the first thing I do is standardize everything: dates, column names, booleans, numbers, etc., so they all speak the same language. After doing that, I'll:

- **Align schemas:** match columns across datasets. If one has extras, I drop or keep them depending on relevance.
- **Unify categories:** I clean up inconsistencies like "Y" vs. "Yes" to avoid downstream issues.
- **Tag the source:** I add a source column so I know where each row came from. This is super useful for tracking or debugging later.
- **Merge or stack:** If the structure is the same, I **concat()**. If I'm matching on something like customer ID, I go with a merge or join.
- **Final clean-up:** I look for duplicates, mismatched types, or broken values post-merge and fix them.

I avoid merging before checking data types or keys. That’s a fast track to lost or duplicated rows.