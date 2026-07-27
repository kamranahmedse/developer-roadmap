# Max Tokens

Max tokens setting controls the maximum number of tokens an LLM can generate in response, directly impacting computation cost, response time, and energy consumption. Setting lower limits doesn't make models more concise—it simply stops generation when the limit is reached. This parameter is crucial for techniques like ReAct where models might generate unnecessary tokens after the desired response. Balancing max tokens involves considering cost efficiency, response completeness, and application requirements while ensuring critical information isn't truncated.

Visit the following resources to learn more:

- [@official@Token Counting - Anthropic](https://platform.claude.com/docs/en/build-with-claude/token-counting)
- [@article@Max Tokens - LLM Parameter Guide - Vellum](https://www.vellum.ai/llm-parameters/max-tokens)