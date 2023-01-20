# Scalars

Scalars are “leaf” values in GraphQL. There are several built-in scalars, and you can define custom scalars, too. (Enums are also leaf values.) The built-in scalars are:

- **String**, like a JSON or Ruby string
- **Int**, like a JSON or Ruby integer
- **Float**, like a JSON or Ruby floating point decimal
- **Boolean**, like a JSON or Ruby boolean (true or false)
- **ID**, which a specialized String for representing unique object identifiers
- **ISO8601DateTime**, an ISO 8601-encoded datetime
- **ISO8601Date**, an ISO 8601-encoded date
- **JSON**, This returns arbitrary JSON (Ruby hashes, arrays, strings, integers, floats, booleans and nils). Take care: by using this type, you completely lose all GraphQL type safety. Consider building object types for your data instead.
- **BigInt**, a numeric value which may exceed the size of a 32-bit integer

Learn more from the following links:

- [Get started with Scalars in GraphQL](https://graphql.org/learn/schema/#scalar-types)
- [Custom GraphQL Scalars](https://www.howtographql.com/typescript-apollo/7-voting-and-scalars/)
- [Overview of GraphQL Scalars 1.0](https://medium.com/the-guild/graphql-scalars-1-0-is-out-more-types-data-integrity-and-strict-validations-on-graphql-972079428fb)
- [Scalars in GraphQL](https://graphql-ruby.org/type_definitions/scalars)