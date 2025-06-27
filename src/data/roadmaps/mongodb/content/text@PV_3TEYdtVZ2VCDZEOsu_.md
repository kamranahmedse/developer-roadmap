# $text

The $text operator in MongoDB performs full-text search on fields with text indexes. It supports phrase matching, stemming, stop words, and relevance scoring. $text searches across all text-indexed fields simultaneously and provides score-based ranking of results. This operator requires a text index on the collection and enables efficient search functionality for text-heavy applications.