# Zero Shot Chain of Thought

Zeroshot chain of thought is a prompting technique that encourages models to provide multi-step reasoning or follow a series of interconnected thoughts in order to tackle a given problem. This technique is particularly effective in tasks where the answer requires a reasoning process or depends on chaining several intermediate ideas together.


How to implement a zeroshot chain of thought prompt:

- Start by defining a clear initial question or problem that will serve as the starting point for the chain.
- Craft a prompt that not only asks the model to provide an answer to the initial question, but also requests that the model explain its reasoning step by step.
- Encourage the model to consider intermediate steps, possible alternatives, or connections between ideas explicitly in its response.

## Example

Suppose you want the model to explain how a solar panel works. A zeroshot chain of thought prompt could look like this:

```
Please explain the process of how a solar panel works, starting with sunlight hitting the panel's surface and ending with electricity being produced. Structure your response as a step-by-step chain of thought, taking care to clarify how each step leads to the next.
```

By designing prompts that explicitly request step-by-step reasoning, the zeroshot chain of thought technique can lead to more comprehensive and insightful answers that go beyond simple factual statements.

Learn more from the following resources:

- [@article@Zero-Shot Prompting | Prompt Engineering Guide](https://www.promptingguide.ai/techniques/zeroshot)
- [@article@Zero-Shot CoT Prompting: Improving AI with Step-by-Step Reasoning](https://learnprompting.org/docs/intermediate/zero_shot_cot)
- [@article@Shot-Based Prompting: Zero-Shot, One-Shot, and Few-Shot Prompting](https://learnprompting.org/docs/basics/few_shot)
- [@guides@Introduction to Advanced Zero-Shot Prompting Techniques](https://learnprompting.org/docs/advanced/zero_shot/introduction)