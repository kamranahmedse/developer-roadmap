# Dropping vs. Imputing

When handling missing values, dropping removes rows or columns with `dropna()`, while imputing fills them with a substitute value using `fillna()` or `SimpleImputer` from Scikit-learn. Dropping is appropriate when missing data is rare or random. Imputing is preferred when data is valuable or missing systematically, using the mean, median, mode, or a predicted value.

Visit the following resources to learn more:

- [@official@pandas.DataFrame.fillna](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.fillna.html)
- [@article@Pandas DataFrame fillna() Method](https://www.w3schools.com/python/pandas/ref_df_fillna.asp)
- [@video@Python Pandas Tutorial 5: Handle Missing Data: fillna, dropna, interpolate](https://www.youtube.com/watch?v=EaGbS7eWSs0)