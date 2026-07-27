# Text Data Type

The `text` data type in Elasticsearch is designed for storing and indexing full-text content, such as blog posts, articles, or product descriptions. When you index a field as `text`, Elasticsearch analyzes the text using an analyzer. This process involves breaking the text into individual terms (tokens), lowercasing them, removing stop words, and applying stemming. This analysis enables Elasticsearch to perform full-text searches, allowing users to find documents based on relevant keywords or phrases within the text.

Visit the following resources to learn more:

- [@official@Text type family](https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/text-type-family)
- [@official@Text analysis](https://www.elastic.co/docs/manage-data/data-store/text-analysis)
- [@article@Elasticsearch Keyword vs. Text](https://opster.com/guides/elasticsearch/search-apis/elasticsearch-strings-keyword-vs-text-vs-wildcard/)
- [@article@Elasticsearch: Text vs. Keyword](https://www.codecurated.com/blog/elasticsearch-text-vs-keyword/)