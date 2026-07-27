# isnull, isna

`isnull()` and `isna()` are equivalent Pandas methods that return a boolean DataFrame or Series indicating which values are missing (NaN). They are the first step in assessing data completeness. Combined with `.sum()`, they give a count of missing values per column, and with boolean indexing they select rows with missing data.

Visit the following resources to learn more:

- [@official@Working with missing data](https://pandas.pydata.org/docs/user_guide/missing_data.html)
- [@official@pandas.isnull](https://pandas.pydata.org/docs/reference/api/pandas.isnull.html)
- [@official@pandas.isna](https://pandas.pydata.org/docs/reference/api/pandas.isna.html)
- [@article@Handling Missing Values with Pandas](https://towardsdatascience.com/handling-missing-values-with-pandas-b876bf6f008f/)