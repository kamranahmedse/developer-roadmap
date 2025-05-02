# RAG and Vector Databases

RAG, short for Retrieval-Augmented Generation, lets an AI agent pull facts from stored data each time it answers. The data sits in a vector database. In that database, every text chunk is turned into a number list called a vector. Similar ideas create vectors that lie close together, so the agent can find related chunks fast. When the user asks a question, the agent turns the question into its own vector, finds the nearest chunks, and reads them. It then writes a reply that mixes the new prompt with those chunks. Because the data store can hold a lot of past chats, documents, or notes, this process gives the agent a working memory without stuffing everything into the prompt. It lowers token cost, keeps answers on topic, and allows the memory to grow over time.

Visit the following resources to learn more:

- [@article@Understanding Retrieval-Augmented Generation (RAG) and Vector Databases](https://pureai.com/Articles/2025/03/03/Understanding-RAG.aspx)
- [@article@Build Advanced Retrieval-Augmented Generation Systems](https://learn.microsoft.com/en-us/azure/developer/ai/advanced-retrieval-augmented-generation)
- [@article@What Is Retrieval-Augmented Generation, aka RAG?](https://blogs.nvidia.com/blog/what-is-retrieval-augmented-generation/)
