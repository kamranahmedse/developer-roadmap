# Retrieval by Pattern

Retrieval by pattern in Redis refers to the ability to query keys using wildcard patterns, enabling users to fetch multiple keys that match specific criteria. This is primarily accomplished using the `KEYS` command, which supports glob-style patterns such as `*` (matches any characters), `?` (matches a single character), and `[]` (matches a range of characters). For example, a pattern like `user:*` would return all keys that start with `user:`. However, it's important to note that while `KEYS` is useful for pattern matching, it is not recommended for use in production environments with a large number of keys, as it can block the server and negatively impact performance. Instead, Redis provides the `SCAN` command, which allows for incremental iteration over keys in the database, enabling pattern-based retrieval without the performance overhead associated with `KEYS`. This makes retrieval by pattern a powerful feature for managing and querying data in Redis while maintaining efficiency and responsiveness.

Learn more from the following resources:

