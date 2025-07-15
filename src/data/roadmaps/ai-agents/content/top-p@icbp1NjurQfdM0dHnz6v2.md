# Top-p

Top-p, also called nucleus sampling, is a setting that guides how an LLM picks its next word. The model lists many possible words and sorts them by probability. It then finds the smallest group of top words whose combined chance adds up to the chosen p value, such as 0.9. Only words inside this group stay in the running; the rest are dropped. The model picks one word from the kept group at random, weighted by their original chances. A lower p keeps only the very likely words, so output is safer and more focused. A higher p lets in less likely words, adding surprise and creativity but also more risk of error.

Visit the following resources to learn more:

- [@article@Nucleus Sampling](https://nn.labml.ai/sampling/nucleus.html)
- [@article@Sampling Techniques in Large Language Models (LLMs)](https://medium.com/@shashankag14/understanding-sampling-techniques-in-large-language-models-llms-dfc28b93f518)
- [@article@Temperature, top_p and top_k for chatbot responses](https://community.openai.com/t/temperature-top-p-and-top-k-for-chatbot-responses/295542)
