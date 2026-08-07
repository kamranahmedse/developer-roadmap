# XLEN

The XLEN command used to get the length of a stream, returning the number of entries it contains. This simple yet powerful command provides a quick way to assess the size of a stream without retrieving its contents. Unlike other Redis types, zero-length streams are possible so XLEN should be used in tandem with TYPE or EXISTS.

Visit the following resources to learn more:

- [@official@XLEN](https://redis.io/docs/latest/commands/xlen/)