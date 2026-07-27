# Forward / Backward Fill

Forward fill (`ffill`) propagates the last valid value forward to fill subsequent missing entries. Backward fill (`bfill`) does the reverse, filling from the next valid value. Both are commonly used for time series data where missing values represent periods where the previous or next observation is the best estimate.

Visit the following resources to learn more:

- [@official@pandas.DataFrame.ffill](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.ffill.html)
- [@official@pandas.DataFrame.bfill](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.bfill.html)
- [@article@How to Fill Missing Data with Pandas](https://towardsdatascience.com/how-to-fill-missing-data-with-pandas-8cb875362a0d/)