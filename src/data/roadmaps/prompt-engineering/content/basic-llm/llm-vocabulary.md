# Vocabulary

When working with LLMs, you will come across a lot of new terms. This section will help you understand the meaning of these terms and how they are used in the context of LLMs.

- **Machine Learning (ML)** — ML is a field of study that focuses on algorithms that can learn from data. ML is a subfield of AI.

- **"Model" vs. "AI" vs. "LLM"** — These terms are used somewhat interchangeably throughout this course, but they do not always mean the same thing. LLMs are a type of AI, as noted above, but not all AIs are LLMs. When we mentioned models in this course, we are referring to AI models. As such, in this course, you can consider the terms "model" and "AI" to be interchangeable.

- **LLM** — Large language model. A large language model is a type of artificial intelligence that can understand and generate human-like text based on the input it receives. These models have been trained on vast amounts of text data and can perform a wide range of language-related tasks, such as answering questions, carrying out conversations, summarizing text, translating languages, and much more.

- **MLM** — Masked language model. A masked language model is a type of language model that is trained to predict the next word in a sequence of words. It is typically trained on a large corpus of text data and can be used for a variety of tasks, such as machine translation, sentiment analysis, summarization, and more.

- **NLP** — Natural language processing. Natural language processing is a branch of artificial intelligence that deals with the interaction between computers and human languages. It is used to analyze, understand, and generate human language.

- **Label** — Labels are just possibilities for the classification of a given text. For example, if you have a text that says "I love you", then the labels could be "positive", "negative", or "neutral". The model will try to predict which label is most likely to be correct based on the input text.

- **Label Space** — The label space is the set of all possible labels that can be assigned to a given text. For example, if you have a text that says "I love you", then the label space could be "positive", "negative", or "neutral".

- **Label Distribution** — The label distribution is the probability distribution over the label space. For example, if you have a text that says "I love you", then the label distribution could be \[0.8, 0.1, 0.1]. This means that the model thinks there is an 80% chance that the text is positive, a 10% chance that it is negative, and a 10% chance that it is neutral.

- **Sentiment Analysis** — Sentiment analysis is the process of determining the emotional tone behind a series of words, used to gain an understanding of the attitudes, opinions and emotions expressed within an online mention. Sentiment analysis is also known as opinion mining, deriving the opinion or attitude of a speaker.

- **Verbalizer** — In the classification setting, verbalizers are mappings from labels to words in a language model's vocabulary. For example, consider performing sentiment classification with the following prompt:
  ```
  Tweet: "I love hotpockets"
  What is the sentiment of this tweet? Say 'pos' or 'neg'.
  ```
  Here, the verbalizer is the mapping from the conceptual labels of `positive` and `negative` to the tokens `pos` and `neg`.

- **Reinforcement Learning from Human Feedback (RLHF)** — RLHF is a technique for training a model to perform a task by providing it with human feedback. The model is trained to maximize the amount of positive feedback it receives from humans, while minimizing the amount of negative feedback it receives.

References and further learning:

- [@article@LLM Vocabulary](https://learnprompting.org/docs/vocabulary)
- [@feed@Explore top posts about LLM](https://app.daily.dev/tags/llm?ref=roadmapsh)
