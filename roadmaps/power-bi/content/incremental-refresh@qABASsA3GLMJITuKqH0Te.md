# Incremental Refresh
 
Incremental refresh configures a dataset to only reload recent data on each refresh, rather than reprocessing the entire history every time. It uses date-based partitions defined with parameters, refreshing a small recent window while leaving older partitions untouched. This significantly cuts refresh time and resource use for large, growing datasets.