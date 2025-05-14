# Context Windows

A context window is the chunk of text a large language model can read at one time. It is measured in tokens, which are pieces of words. If a model has a 4,000-token window, it can only “look at” up to about 3,000 words before it must forget or shorten earlier parts. New tokens push old ones out, like a sliding window moving over text. The window size sets hard limits on how long a prompt, chat history, or document can be. A small window forces you to keep inputs short or split them, while a large window lets the model follow longer stories and hold more facts. Choosing the right window size balances cost, speed, and how much detail the model can keep in mind at once.

New techniques, like retrieval-augmented generation (RAG) and long-context transformers (e.g., Claude 3, Gemini 1.5), aim to extend usable context without hitting model limits directly.

Visit the following resources to learn more:

- [@article@What is a Context Window in AI?](https://www.ibm.com/think/topics/context-window)
- [@article@Scaling Language Models with Retrieval-Augmented Generation (RAG)](https://arxiv.org/abs/2005.11401)
- [@article@Long Context in Language Models - Anthropic's Claude 3](https://www.anthropic.com/news/claude-3-family)
