# Few Shot Prompting

Few-shot prompting is a technique in which a machine learning model is primed with a small number of examples (or "shots") that demonstrate the desired behavior, output, or task, before being presented with a new, related input. This approach allows the model to build an understanding of what is expected of it, even with limited context. It is particularly valuable for fine-tuning and generalizing large pre-trained models such as OpenAI's GPT-3.

## Key Principles

When using few-shot prompting, consider the following:

- **Number of examples**: A few-shot setting typically involves 2-10 examples (but can vary), depending on the clarity and complexity of the task.
- **Context and relevancy**: The examples should be relevant to the desired task and provide an adequate basis for shaping the model's output.
- **Balance**: Strive for a balance between too few examples (under-specification) and too many examples (repetition and over-specification).

## Examples & Tips

Consider the following example for a sentiment-analysis task using few-shot prompting. You provide some labeled input/output pairs to the model, which helps it understand your expectations:

```
The movie was fantastic! - Positive
I didn't enjoy the food at all. - Negative
Amazing vacation, I had a great time! - Positive
She looks upset and angry. - Negative
```

After providing these examples, introduce the query you want the model to analyze:

```
The book was hard to put down. - {sentiment_label}
```

This prompt structure assists the model in grasping the sentiment analysis task and increases the likelihood of getting the correct output (i.e., "Positive").

Remember to experiment with the number of examples and their content to find the optimal balance for your specific task. Additionally, you can use inline instructions to guide the model further, such as asking it to classify the sentiment of a given sentence.

Learn more from the following resources:

- [@article@Few-Shot Prompting | Prompt Engineering Guide](https://www.promptingguide.ai/techniques/fewshot)
- [@article@Shot-Based Prompting: Zero-Shot, One-Shot, and Few-Shot Prompting](https://learnprompting.org/docs/basics/few_shot)
- [@guides@Introduction to Advanced Few-Shot Prompting Techniques](https://learnprompting.org/docs/advanced/few_shot/introduction)