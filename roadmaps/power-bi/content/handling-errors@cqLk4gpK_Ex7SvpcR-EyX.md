# Handling Errors

Power Query flags rows where a transformation fails, such as a text value that cannot convert to a number, and marks them as errors rather than stopping the whole query. These errors can be removed, replaced with a default value, or kept for review, depending on how the discrepancy should be handled. Left unresolved, errors will cause the refresh to fail once the query tries to load that data into the model.

Visit the following resources to learn more:

- [@official@Dealing with errors in Power Query](https://learn.microsoft.com/en-us/power-query/dealing-with-errors)
- [@video@Power BI - Introduction to Handling Errors](https://www.youtube.com/watch?v=eC9U5nhQmno)