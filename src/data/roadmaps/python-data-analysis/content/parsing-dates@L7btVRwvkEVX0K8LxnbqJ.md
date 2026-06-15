# Parsing Dates
 
Date columns loaded from CSV are typically read as strings and must be converted to datetime objects for time-based operations. `pd.to_datetime()` parses date strings in many formats and accepts a `format` parameter for custom patterns. Once parsed, datetime columns enable operations like extracting year/month, computing differences, and resampling time series.