# isnull, isna
 
`isnull()` and `isna()` are equivalent Pandas methods that return a boolean DataFrame or Series indicating which values are missing (NaN). They are the first step in assessing data completeness. Combined with `.sum()`, they give a count of missing values per column, and with boolean indexing they select rows with missing data.