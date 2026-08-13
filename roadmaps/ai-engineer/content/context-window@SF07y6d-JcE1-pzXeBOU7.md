# Context Window
 
The context window is the amount of text an LLM can process in a single request, measured in tokens. It includes the system prompt, conversation history, retrieved documents, and the model's own output as it generates a response. Once the total content exceeds this limit, older or lower priority information has to be dropped, summarized, or moved out of the active context. Model providers have expanded context windows significantly over the past few years, but a larger window does not guarantee the model uses all of it well.

Visit the following resources to learn more:

- [@article@What is a context window?](https://www.ibm.com/think/topics/context-window)
- [@article@Coding Agents Don’t Need Bigger Context Windows](https://towardsdatascience.com/coding-agents-dont-need-bigger-context-windows-they-need-a-context-compiler/)
- [@video@What is a Context Window? Unlocking LLM Secrets](https://www.youtube.com/watch?v=-QVoIxEpFkM)
- [@video@Why LLMs get dumb (Context Windows Explained)](https://www.youtube.com/watch?v=TeQDr4DkLYo)