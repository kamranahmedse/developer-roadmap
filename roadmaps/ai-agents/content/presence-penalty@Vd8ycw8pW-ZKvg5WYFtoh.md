# Presence Penalty

Presence penalty is a setting you can adjust when you ask a large language model to write. It pushes the model to choose words it has not used yet. Each time a word has already appeared, the model gets a small score cut for picking it again. A higher penalty gives bigger cuts, so the model looks for new words and fresh ideas. A lower penalty lets the model reuse words more often, which can help with repeats like rhymes or bullet lists. Tuning this control helps you steer the output toward either more variety or more consistency.

Visit the following resources to learn more:

- [@article@Understanding Presence Penalty and Frequency Penalty](https://medium.com/@pushparajgenai2025/understanding-presence-penalty-and-frequency-penalty-in-openai-chat-completion-api-calls-2e3a22547b48)
- [@article@Difference between Frequency and Presence Penalties?](https://community.openai.com/t/difference-between-frequency-and-presence-penalties/2777)
- [@article@LLM Parameters Explained: A Practical Guide with Examples](https://learnprompting.org/blog/llm-parameters)