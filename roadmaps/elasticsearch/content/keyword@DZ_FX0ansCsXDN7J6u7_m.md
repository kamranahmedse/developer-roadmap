# Keyword Data Type

The Keyword data type in Elasticsearch is used for indexing fields that contain structured, string-based data. Unlike the Text data type, Keyword fields are not analyzed or tokenized; the entire string is indexed as a single term. This makes them ideal for filtering, sorting, and exact-match queries, where you need to find documents with a specific, complete value.

Visit the following resources to learn more:

- [@official@Keyword type family](https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/keyword)