# Incremental Refresh

Incremental refresh configures a dataset to only reload recent data on each refresh, rather than reprocessing the entire history every time. It uses date-based partitions defined with parameters, refreshing a small recent window while leaving older partitions untouched. This significantly cuts refresh time and resource use for large, growing datasets.

Visit the following resources to learn more:

- [@official@Configure incremental refresh and real-time data for Power BI](https://learn.microsoft.com/en-us/power-bi/connect-data/incremental-refresh-overview)
- [@video@Configuring Incremental Refresh in Power BI](https://www.youtube.com/watch?v=Kui_1G6kQIQ)