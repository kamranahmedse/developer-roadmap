# Get Document

To retrieve a specific document from an Elasticsearch index, you need to know its unique identifier. You can then use the Get API, providing the index name and the document ID. Elasticsearch will then search for the document with that ID within the specified index and return it. The response will include the document's source data (the fields and their values), along with metadata like the index, ID, version, and whether the document was found.

Visit the following resources to learn more:

- [@official@Get a document by its ID](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-get)
- [@article@Efficiently Searching by Document ID in Elasticsearch](https://opster.com/guides/elasticsearch/search-apis/efficiently-searching-by-document-id-elasticsearch/)
- [@video@How to retrieve documents in Elasticsearch?](https://www.youtube.com/watch?v=QRtRsWSn3n4)