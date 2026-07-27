# Parsing Dates

Date columns loaded from CSV are typically read as strings and must be converted to datetime objects for time-based operations. `pd.to_datetime()` parses date strings in many formats and accepts a `format` parameter for custom patterns. Once parsed, datetime columns enable operations like extracting year/month, computing differences, and resampling time series.

Visit the following resources to learn more:

- [@official@pandas.to_datetime](https://pandas.pydata.org/docs/reference/api/pandas.to_datetime.html)
- [@article@Working with Dates and Time Series Data](https://www.youtube.com/watch?v=UFuo7EHI8zc)
- [@article@Dealing with Date and Time in Pandas DataFrames](https://towardsdatascience.com/dealing-with-date-and-time-in-pandas-dataframes-7d140f711a47/)