# Doc Values

Doc values are a data structure in Elasticsearch that stores field values in a column-oriented fashion, optimized for aggregations, sorting, and scripting. Instead of storing the data alongside the inverted index, doc values are stored separately on disk, making them efficient for retrieving values for a large number of documents. This allows Elasticsearch to perform operations like sorting and aggregations much faster than if it had to retrieve the data from the inverted index.

Visit the following resources to learn more:

- [@official@doc_values](https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/doc-values)
- [@article@Elasticsearch doc-values-only Fields](https://opster.com/guides/elasticsearch/data-architecture/elasticsearch-doc-values-only-fields/)
- [@article@Elasticsearch _source, doc_values and store Performance](https://sease.io/2021/02/field-retrieval-performance-in-elasticsearch.html)
- [@video@Field Data vs Doc Values | Understanding Elasticsearch Performance Issues](https://www.youtube.com/watch?v=l99lIuvQULk)