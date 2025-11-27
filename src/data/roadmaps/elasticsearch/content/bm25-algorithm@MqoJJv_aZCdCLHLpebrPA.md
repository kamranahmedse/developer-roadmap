# BM25 Algorithm

BM25 (Best Matching 25) is a ranking function used by search engines to estimate the relevance of documents to a given search query. It's a bag-of-words retrieval function that scores documents based on the query terms appearing in each document, taking into account term frequency and document length. The algorithm adjusts for document length, preventing longer documents from being unfairly favored, and also considers how frequently a term appears in the entire collection of documents.

Visit the following resources to learn more:

- [@official@Practical BM25 - Part 1: How Shards Affect Relevance Scoring in Elasticsearch](https://www.elastic.co/blog/practical-bm25-part-1-how-shards-affect-relevance-scoring-in-elasticsearch)
- [@official@Practical BM25 — Part 2: The BM25 Algorithm and its variables](https://www.elastic.co/blog/practical-bm25-part-2-the-bm25-algorithm-and-its-variables)
- [@official@Practical BM25 - Part 3: Considerations for Picking b and k1 in Elasticsearch](https://www.elastic.co/blog/practical-bm25-part-3-considerations-for-picking-b-and-k1-in-elasticsearch)
- [@official@Improved Text Scoring with BM25](https://www.elastic.co/elasticon/conf/2016/sf/improved-text-scoring-with-bm25)
- [@article@Okapi BM25](https://en.wikipedia.org/wiki/Okapi_BM25)