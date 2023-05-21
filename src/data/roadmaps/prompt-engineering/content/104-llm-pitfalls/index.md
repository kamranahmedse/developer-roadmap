# Pitfalls of LLMs

LLMs are extremely powerful, but they are by no means perfect. There are many pitfalls that you should be aware of when using them.

### Model Guessing Your Intentions

Sometimes, LLMs might not fully comprehend the intent of your prompt and may generate generic or safe responses. To mitigate this, make your prompts more explicit or ask the model to think step-by-step before providing a final answer.

### Sensitivity to Prompt Phrasing

LLMs can be sensitive to the phrasing of your prompts, which might result in completely different or inconsistent responses. Ensure that your prompts are well-phrased and clear to minimize confusion.

### Model Generating Plausible but Incorrect Answers

In some cases, LLMs might generate answers that sound plausible but are actually incorrect. One way to deal with this is by adding a step for the model to verify the accuracy of its response or by prompting the model to provide evidence or a source for the given information.

### Verbose or Overly Technical Responses

LLMs, especially larger ones, may generate responses that are unnecessarily verbose or overly technical. To avoid this, explicitly guide the model by making your prompt more specific, asking for a simpler response, or requesting a particular format.

### LLMs Not Asking for Clarification

When faced with an ambiguous prompt, LLMs might try to answer it without asking for clarification. To encourage the model to seek clarification, you can prepend your prompt with "If the question is unclear, please ask for clarification."

### Model Failure to Perform Multi-part Tasks

Sometimes, LLMs might not complete all parts of a multi-part task or might only focus on one aspect of it. To avoid this, consider breaking the task into smaller, more manageable sub-tasks or ensure that each part of the task is clearly identified in the prompt.
