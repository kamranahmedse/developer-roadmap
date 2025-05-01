# LlamaIndex

LlamaIndex is an open-source Python toolkit that helps you give a language model access to your own data. You load files such as PDFs, web pages, or database rows. The toolkit breaks the text into chunks, turns them into vectors, and stores them in a chosen vector store like FAISS or Pinecone. When a user asks a question, LlamaIndex finds the best chunks, adds them to the prompt, and sends the prompt to the model. This flow is called retrieval-augmented generation and it lets an agent give answers grounded in your content. The library offers simple classes for loading, indexing, querying, and composing tools, so you write less boilerplate code. It also works with other frameworks, including LangChain, and supports models from OpenAI or Hugging Face. With a few lines of code you can build a chatbot, Q&A system, or other agent that knows your documents.

Visit the following resources to learn more:

- [@official@LlamaIndex](https://llamaindex.ai/)
- [@official@LlamaIndex Documentation](https://docs.smith.langchain.com/)
- [@official@What is LlamaIndex.TS](https://ts.llamaindex.ai/docs/llamaindex)
- [@opensource@run-llama/llama_index](https://github.com/run-llama/llama_index)
- [@article@What is LlamaIndex? - IBM](https://www.ibm.com/think/topics/llamaindex)
- [@article@LlamaIndex - Hugging Face](https://huggingface.co/llamaindex)