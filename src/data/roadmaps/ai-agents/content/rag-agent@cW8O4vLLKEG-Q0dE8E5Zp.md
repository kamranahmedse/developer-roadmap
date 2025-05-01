# RAG Agent

A RAG (Retrieval-Augmented Generation) agent mixes search with language generation so it can answer questions using fresh and reliable facts. When a user sends a query, the agent first turns that query into an embedding—basically a number list that captures its meaning. It then looks up similar embeddings in a vector database that holds passages from web pages, PDFs, or other text. The best-matching passages come back as context. The agent puts the original question and those passages into a large language model. The model writes the final reply, grounding every sentence in the retrieved text. This setup keeps the model smaller, reduces wrong guesses, and lets the system update its knowledge just by adding new documents to the database. Common tools for building a RAG agent include an embedding model, a vector store like FAISS or Pinecone, and an LLM connected through a framework such as LangChain or LlamaIndex.

Visit the following resources to learn more:

- [@article@What is RAG? - Retrieval-Augmented Generation AI Explained](https://aws.amazon.com/what-is/retrieval-augmented-generation/)
- [@article@What Is Retrieval-Augmented Generation, aka RAG?](https://blogs.nvidia.com/blog/what-is-retrieval-augmented-generation/)
