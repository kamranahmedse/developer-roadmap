# Prompt Injection

Prompt injection is a technique used in prompt engineering to fine-tune and manipulate model outputs more effectively. Instead of simply asking a question or giving a command, prompt injection involves carefully inserting additional context or instructions into the prompt to guide the model and achieve desired responses.

### Examples of Prompt Injection Techniques:

1. **Persistent context:** Repeat important context between turns, especially when the conversation is long or the model fails to retain necessary information.

```markdown
User: What is the capital of France?
AI: The capital of France is Paris.
User: How many people live there approximately?
AI: ...
```

With prompt injection:
```markdown
User: What is the capital of France?
AI: The capital of France is Paris.
User: How many people live in Paris, the capital of France, approximately?
AI: ...
```

2. **Instruct the model:** Explicitly instruct the model to provide a certain type of answer or deliver the output in a specific manner.

```markdown
User: Write a summary of the French Revolution.
AI: ...
```

With prompt injection:
```markdown
User: Write a brief, unbiased, and informative summary of the French Revolution focusing on major events and outcomes.
AI: ...
```

3. **Ask for step-by-step explanations:** Encourage the model to think step by step or weigh pros and cons before arriving at a conclusion.

```markdown
User: Should I buy this stock?
AI: ...
```

With prompt injection:
```markdown
User: What are the potential risks and benefits of buying this stock, and what factors should I consider before making a decision?
AI: ...
```

Keep in mind that prompt injection requires experimentation and iterating on your approach to find the most effective phrasing or context. By combining prompt injection with other prompt engineering techniques, you can enhance model performance and tailor outputs to meet specific user requirements.