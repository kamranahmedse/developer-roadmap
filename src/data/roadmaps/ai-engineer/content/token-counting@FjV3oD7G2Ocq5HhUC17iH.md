# Token Counting

Token counting refers to tracking the number of tokens processed during interactions with language models, including both input and output text. Tokens are units of text that can be as short as a single character or as long as a word, and models like GPT process text by splitting it into these tokens. Knowing how many tokens are used is crucial because the API has token limits (e.g., 4,096 for GPT-3 and up to 32,768 for some versions of GPT-4), and costs are typically calculated based on the total number of tokens processed.

Learn more from the following resources:

- [@official@OpenAI Tokenizer Tool](https://platform.openai.com/tokenizer)
- [@article@How to count tokens with Tiktoken](https://cookbook.openai.com/examples/how_to_count_tokens_with_tiktoken)