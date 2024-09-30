# Leaderboards and Counters

Leaderboards and counters are common use cases for Redis, leveraging its sorted sets and atomic increment operations. For leaderboards, the `ZADD` command is used to add members with their scores to a sorted set, and `ZRANGE` or `ZREVRANGE` retrieves the top (or bottom) ranked members efficiently. This makes Redis ideal for ranking systems in gaming or tracking top-performing entities. Counters are managed using commands like `INCR` and `DECR`, which atomically increase or decrease integer values. These operations are lightweight and performant, making Redis a go-to solution for tracking metrics, analytics, or rate limiting.

Learn more from the following resources:

