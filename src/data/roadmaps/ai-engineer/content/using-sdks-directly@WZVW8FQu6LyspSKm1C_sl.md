# Using SDKs Directly

While tools like Langchain and LlamaIndex make it easy to implement RAG, you don't have to necessarily learn and use them. If you know about the different steps of implementing RAG you can simply do it all yourself e.g. do the chunking using @langchain/textsplitters package, create embeddings using any LLM e.g. use OpenAI Embedding API through their SDK, save the embeddings to any vector database e.g. if you are using Supabase Vector DB, you can use their SDK and similarly you can use the relevant SDKs for the rest of the steps as well.

Learn more from the following resources:

- [@official@Langchain Text Splitter Package](https://www.npmjs.com/package/@langchain/textsplitters)
- [@official@OpenAI Embedding API](https://platform.openai.com/docs/guides/embeddings)
- [@official@Supabase AI & Vector Documentation](https://supabase.com/docs/guides/ai)
