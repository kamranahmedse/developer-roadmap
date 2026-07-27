# Bulk Indexing

Bulk indexing in Elasticsearch is a way to send multiple indexing, updating, or deleting operations to the Elasticsearch cluster in a single request. Instead of sending each document individually, you batch them together, which significantly reduces the overhead of network communication and processing, leading to faster indexing speeds. This approach is particularly useful when dealing with large datasets or when needing to ingest data quickly.

Visit the following resources to learn more:

- [@official@Bulk index or delete documents](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-bulk)
- [@article@Tune for indexing speed](https://www.elastic.co/docs/deploy-manage/production-guidance/optimize-performance/indexing-speed)
- [@article@How to Index Elasticsearch Documents with the Bulk API in Python](http://towardsdatascience.com/how-to-index-elasticsearch-documents-with-the-bulk-api-in-python-b5bb01ed3824/)
- [@article@Optimizing Elasticsearch Bulk Indexing for High Performance](https://opster.com/guides/elasticsearch/how-tos/optimizing-elasticsearch-bulk-indexing-high-performance/)
- [@video@Bulk API for Multiple Document Indexing and Modification [ElasticSearch 7 for Beginners #3.3]](https://www.youtube.com/watch?v=6IYkfn9me-w)