# Dates

Dates in Elasticsearch represent points in time. They are stored internally as the number of milliseconds since the Unix epoch (January 1, 1970, 00:00:00 UTC). Elasticsearch provides flexibility in how you format date values when indexing documents, allowing you to use strings in various formats or numeric values representing milliseconds since the epoch. When querying, you can use date ranges and other date-specific operations to filter and analyze your data based on time.

Visit the following resources to learn more:

- [@official@Date field type](https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/date)
- [@official@Date nanoseconds field type](https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/date_nanos)