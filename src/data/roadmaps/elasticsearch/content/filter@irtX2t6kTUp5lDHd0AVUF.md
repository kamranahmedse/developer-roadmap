# Bool Query Filter Context

The `filter` context within a Bool query in Elasticsearch is used to narrow down the documents that match a query without affecting the relevance score. It's like a pre-filter that efficiently excludes documents that don't meet specific criteria before the scoring process even begins, making it ideal for exact matches, range queries, and other conditions where relevance isn't a factor.

Visit the following resources to learn more:

- [@official@Boolean query](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-bool-query)
- [@official@Lost in Translation: Boolean Operations and Filters in the Bool Query](https://www.elastic.co/blog/lost-in-translation-boolean-operations-and-filters-in-the-bool-query)
- [@video@Elasticsearch Bool Query (Should & Filter Clauses) - S1E14: Mini Beginner's Crash Course](https://www.youtube.com/watch?v=Uh1F2lezIfY)
- [@video@Boolean Query in Elasticsearch | Bool, Filter, Must, Must Not, Should, DSL | ES7 for Beginners #4.3](https://www.youtube.com/watch?v=ba2Qn3y486M)