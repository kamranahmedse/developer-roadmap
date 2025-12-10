# Flattened Data Type

The flattened data type in Elasticsearch allows you to index an entire JSON object as a single field. This is useful when you have objects with many fields, but you only need to search or aggregate on a small subset of them. Instead of mapping each individual field, the flattened type indexes the entire object as a string, enabling you to query specific values within the object using specialized queries.

Visit the following resources to learn more:

- [@official@Flattened field type](https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/flattened)
- [@article@Flattened Datatype Mappings — Elasticsearch Tutorial](https://alirezadp10.medium.com/flattened-datatype-mappings-elasticsearch-tutorial-1cf77497e706)
- [@video@Flattened Datatype](https://www.youtube.com/watch?v=UhPaEMR4pJ4)