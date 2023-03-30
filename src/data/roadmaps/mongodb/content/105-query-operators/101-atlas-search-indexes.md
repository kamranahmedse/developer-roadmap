# Atlas Search indexes

Atlas Search Indexes are a powerful feature of MongoDB Atlas that allows you to create indexes on your dataset for advanced text searching and filtering functionalities. These indexes are built using the open-source search engine "Apache Lucene" to provide robust search capabilities directly within your MongoDB environment, enabling you to perform full-text search, filter, and scoring operations.

## Benefits of Atlas Search Indexes

- **Advanced Text Search:** Enhance search experience with support for multi-language text search, scoring, and relevancy rankings.

- **Versatile Querying:** Perform advanced queries using a wide array of search operators like range, wildcard, and fuzzy queries.

- **Dynamic Field Mapping:** Auto-map fields in your collection for seamless indexing without requiring a strict schema.

- **Real-time Indexing:** Keep your search indexes up-to-date by updating them with database changes in near real-time.

## Key Components

Here are a few essential components you should know when working with Atlas Search Indexes:

- **Index Definitions**: Index Definitions specify which fields in your collection to index and the analyzer to use for processing text. They ensure that your search queries are fast and efficient.

```json
{
  "mappings": {
    "dynamic": false,
    "fields": {
      "title": {
        "type": "string",
        "analyzer": "lucene.standard"
      },
      "description": {
        "type": "string",
        "analyzer": "lucene.english"
      }
    }
  }
}
```

- **Search Operators**: These are the query operators that allow you to perform advanced search operations on your indexed data. Some common search operators are:

- `$search`: The primary search operator for Atlas Search queries.
- `$compound`: Combines multiple queries using logical operators (`must`, `should`, `mustNot`).
- `$text`: Performs text search queries.
- `$range`: Performs range queries on the indexed data.

- **Analyzers**: Analyzers process text input for indexing and search operations. They are responsible for tokenizing text, creating tokens, and processing filter conditions. MongoDB Atlas provides a range of Lucene analyzer options for handling different languages and use cases.

## Usage

To use Atlas Search Indexes in your queries, you will need to create an index definition for the required fields and use `$search` operator along with other search operators depending on your requirements.

Here's an example of an Atlas Search Index query:

```javascript
db.collection.find({
  $search: {
    text: {
      query: 'mongodb atlas search',
      path: 'title',
    },
  },
});
```

In this example, we perform a text search query on the "title" field in the given collection.

In summary, Atlas Search Indexes provide you with advanced search and filtering capabilities, rich text processing, and improved query performance. By working with Index Definitions, Search Operators, and Analyzers, you can run advanced text search queries within your MongoDB Atlas environment.
