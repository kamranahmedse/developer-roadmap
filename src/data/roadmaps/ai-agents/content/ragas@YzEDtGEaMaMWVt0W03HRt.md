# Ragas

Ragas is an open-source tool used to check how well a Retrieval-Augmented Generation (RAG) agent works. You give it the user question, the passages the agent pulled from a knowledge base, and the final answer. Ragas then scores the answer for things like correctness, relevance, and whether the cited passages really support the words in the answer. It uses large language models under the hood, so you do not need to write your own scoring rules. Results appear in a clear report that shows strong and weak spots in the pipeline. With this feedback you can change prompts, retriever settings, or model choices and quickly see if quality goes up. This makes testing RAG systems faster, repeatable, and less guess-based.

Visit the following resources to learn more:

- [@official@Ragas Documentation](https://docs.ragas.io/en/latest/)
- [@article@Evaluating RAG Applications with RAGAs](https://towardsdatascience.com/evaluating-rag-applications-with-ragas-81d67b0ee31a/n)
- [@opensource@explodinggradients/ragas](https://github.com/explodinggradients/ragas)
