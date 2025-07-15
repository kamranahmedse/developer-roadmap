GraphQL is a query language for APIs that allows clients to request exactly the data they need, reducing over-fetching or under-fetching.

##### Main differences with REST:

**Data Fetching**:
* REST: Fixed endpoints return predefined data
* GraphQL: Single endpoint with flexible queries

**Batching**:
* GraphQL can fetch related data in one request (nested queries)
* REST often requires multiple endpoints for related data

**Versioning**:
* REST may need new versions for API changes
* GraphQL avoids versioning by evolving schemas

**Example GraphQL Query**:
```graphql
query {
  user(id: 1) {
    name
    posts {
      title
    }
  }
}
``` 