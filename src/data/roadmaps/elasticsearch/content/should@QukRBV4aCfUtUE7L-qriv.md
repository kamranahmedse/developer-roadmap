# Should Query

The `should` query is a boolean query that returns documents matching one or more of its sub-queries. It increases the relevance score for each matching clause, but doesn't require any clauses to match for a document to be included in the results. If no other boolean queries like `must` or `filter` are present, at least one `should` clause must match.

Visit the following resources to learn more:

- [@official@Boolean query](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-bool-query)
- [@article@Elasticsearch Query Bool](https://opster.com/guides/elasticsearch/search-apis/elasticsearch-query-bool/)
- [@article@Elasticsearch Bool Query - Syntax, Example, and Tips](https://pulse.support/kb/elasticsearch-bool-query)
- [@video@Boolean Query in Elasticsearch | Bool, Filter, Must, Must Not, Should, DSL | ES7 for Beginners #4.3](https://www.youtube.com/watch?v=ba2Qn3y486M)
- [@video@Elasticsearch Bool Query (Should & Filter Clauses) - S1E14: Mini Beginner's Crash Course](https://www.youtube.com/watch?v=Uh1F2lezIfY)