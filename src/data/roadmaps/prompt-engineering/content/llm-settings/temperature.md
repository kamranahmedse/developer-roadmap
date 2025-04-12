# Temperature

Temperature is an important setting in the Language Models (LMs), specifically for the fine-tuning process. It refers to the "temperature" parameter in the softmax function of the language model. Adjusting the temperature can influence the randomness or conservativeness of the model's output.

## Role of Temperature

The temperature controls the model's level of creativity and boldness in generating text. A lower temperature value makes the model more conservative, sticking closely to the patterns it has learned from the training data. Higher temperature values encourage the model to explore riskier solutions by allowing less likely tokens to be more probable.

## Practical Uses

When fine-tuning an LM, you can regulate its behavior by adjusting the temperature:

- **Lower temperature values** (e.g., 0.2 or 0.5): The model will be more focused on phrases and word sequences that it learned from the training data. The output will be less diverse, but may lack novelty or creativity. Suitable for tasks where conservativeness is important, such as text summarization or translation.

- **Higher temperature values** (e.g., 1.0 or 2.0): The model will generate more creative outputs with innovative combinations of words. However, it may produce less coherent or contextually improper text. Useful for tasks where exploration and distinctiveness are required, like creative writing or brainstorming.

Experimenting with various temperature values can lead to finding the optimal balance between creativity and coherence, depending on the specific task and desired output.