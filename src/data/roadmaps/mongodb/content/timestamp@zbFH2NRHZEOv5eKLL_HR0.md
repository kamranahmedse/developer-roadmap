# Timestamp

The Timestamp type in MongoDB is a special BSON data type used internally for operations like replication and sharding. It consists of a 32-bit second counter and an incrementing ordinal counter (also 32 bits), representing UTC time accurate to the second. Unlike the Date type, Timestamp values in MongoDB are unique and monotonically increasing, making them ideal for tracking changes and ordering events.

Visit the following resources to learn more:

- [@official@Timestamp](https://www.mongodb.com/docs/manual/reference/bson-types/#timestamps)
- [@article@Working with Dates](https://www.prisma.io/dataguide/mongodb/working-with-dates)
