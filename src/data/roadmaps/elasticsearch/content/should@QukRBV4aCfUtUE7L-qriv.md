# Should Query

The `should` query is a boolean query that returns documents matching one or more of its sub-queries. It increases the relevance score for each matching clause, but doesn't require any clauses to match for a document to be included in the results. If no other boolean queries like `must` or `filter` are present, at least one `should` clause must match.