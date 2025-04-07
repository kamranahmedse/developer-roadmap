# Use Delimiters

When crafting prompts for language models, it's crucial to ensure clear separation between the actual data and the instructions or context provided to the model. This distinction is particularly important when using data-driven prompts, where we want the model to generate responses based on specific input information.

One effective technique to achieve this separation is by using delimiters to mark the boundaries between the prompt and the data. Delimiters act as clear indicators for the model to understand where the data begins and ends, helping it to generate responses more accurately.

Here's how you can use delimiters effectively:

- **Choose appropriate delimiters:** Select delimiters that are unlikely to appear naturally in the data. Commonly used choices include special characters or token combinations that rarely occur in the given context. For instance, you can use triple curly braces (`{{{ }}}`) or a special token like `<|data|>` as delimiters.

- **Position the delimiters correctly:** Place the delimiters at the beginning and end of the data section, while ensuring a clear separation from the prompt. The prompt portion should precede the delimiter, providing the necessary instructions or context for the model.

- **Use consistent delimiters throughout:** Maintain consistency in using the chosen delimiters across all prompts. This ensures uniformity in the data format, making it easier for the model to understand and process the information consistently.

## Examples

```
Summarize the text delimited by triple curly braces into a single sentence.

{{{put_your_text_here}}}
```

```
Translate the text delimited by triple quotes into Arabic.

"""How are you?"""
```
