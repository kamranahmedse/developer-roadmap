# SCARD

`SCARD` is a Redis command used to get the number of members in a set, it returns the cardinality of the specified set, which is the total count of unique elements it contains. If the set does not exist, `SCARD` returns `0`. This command is useful for quickly determining the size of a set, allowing applications to make decisions based on the number of unique items, such as checking user participation in a campaign or the count of unique tags in a system.

Learn more from the following resources:

- [@official@](https://redis.io/docs/latest/commands/scard/)