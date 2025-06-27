# $limit

The $limit aggregation stage restricts the number of documents passed to the next stage in the pipeline. It's commonly used with $sort to get top N results, implement pagination, or reduce data processing overhead. $limit is efficient when combined with indexes and should be placed strategically in the pipeline to minimize document processing in subsequent stages.