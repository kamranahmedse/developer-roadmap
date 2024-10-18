# Chunking

The chunking step in Retrieval-Augmented Generation (RAG) involves breaking down large documents or data sources into smaller, manageable chunks. This is done to ensure that the retriever can efficiently search through large volumes of data while staying within the token or input limits of the model. Each chunk, typically a paragraph or section, is converted into an embedding, and these embeddings are stored in a vector database. When a query is made, the retriever searches for the most relevant chunks rather than the entire document, enabling faster and more accurate retrieval.

Learn more from the following resources:

- [@article@Chunk large documents for vector search solutions in Azure AI Search](https://learn.microsoft.com/en-us/azure/search/vector-search-how-to-chunk-documents)
- [@article@Chunking Strategies for LLM Applications](https://www.pinecone.io/learn/chunking-strategies/)
- [@article@A Guide to Chunking Strategies for Retrieval Augmented Generation](https://zilliz.com/learn/guide-to-chunking-strategies-for-rag)