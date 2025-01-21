# Types of LLMs

On a high level, LLMs can be categorized into two types i.e. Base LLMs and Instruction tuned LLMs.

## Base LLMs

Base LLMs are the LLMs which are designed to predict the next word based on the training data. They are not designed to answer questions, carry out conversations or help solve problems. For example, if you give a base LLM the sentence "In this book about LLMs, we will discuss", it might complete this sentence and give you "In this book about LLMs, we will discsus **what LLMs are, how they work, and how you can leverage them in your applications.**" Or if you give it "What are some famous social networks?", instead of answering it might give back "Why do people use social networks?" or "What are some of the benefits of social networks?". As you can see, it is giving us relevant text but it is not answering the question. This is where the Instruction Tuned LLMs come into the picture.

## Instruction tuned LLMs

Instruction Tuned LLMs, instead of trying to autocomplete your text, try to follow the given instructions using the data that they have been trained on. For example, if you input the sentence "What are LLMs?" it will use the data that it is trained on and try to answer the question. Similarly, if you input "What are some famous social networks?" it will try to answer the question instead of giving you a random answer.

Instruction Tuned LLMs are built on top of Base LLMs:

```
Instruction Tuned LLMs = Base LLMs + Further Tuning + RLHF
```

To build an Instruction Tuned LLM, a Base LLM is taken and is further trained using a large dataset covering sample "Instructions" and how the model should perform as a result of those instructions. The model is then fine-tuned using a technique called "Reinforcement Learning with Human Feedback" (RLHF) which allows the model to learn from human feedback and improve its performance over time.

Learn more from the following resources:

- [@article@Understanding AI Models: Base Language Learning Models vs. Instruction Tuned Language Learning Models - Olivier Mills](https://oliviermills.com/articles/understanding-ai-models-base-language-learning-models-vs-instruction-tuned-language-learning-models)
- [@video@Why Are There So Many Foundation Models?](https://www.youtube.com/watch?v=QPQy7jUpmyA)
- [@video@How to Pick the Right AI Foundation Model](https://www.youtube.com/watch?v=pePAAGfh-IU)
