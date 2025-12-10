# Fielddata

Fielddata is an on-disk data structure used by Elasticsearch to enable aggregations, sorting, and scripting on text fields. Because text fields are analyzed (broken down into individual terms), Elasticsearch needs a way to quickly access all the terms for a specific document when performing these operations. Fielddata loads all the terms for a field into memory, allowing for fast access during these operations.

Visit the following resources to learn more:

- [@article@What is Elasticsearch Fielddata?](https://pulse.support/kb/what-is-elasticsearch-fielddata)
- [@article@Elasticsearch Fielddata](https://opster.com/guides/elasticsearch/glossary/elasticsearch-fielddata/)
- [@video@Field Data vs Doc Values | Understanding Elasticsearch Performance Issues](https://www.youtube.com/watch?v=l99lIuvQULk)