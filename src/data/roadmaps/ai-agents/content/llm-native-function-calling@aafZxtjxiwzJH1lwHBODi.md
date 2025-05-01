# LLM Native "Function Calling"

LLM native “function calling” lets a large language model decide when to run a piece of code and which inputs to pass to it. You first tell the model what functions are available. For each one you give a short name, a short description, and a list of arguments with their types. During a chat, the model can answer in JSON that matches this schema instead of plain text. Your wrapper program reads the JSON, calls the real function, and then feeds the result back to the model so it can keep going. This loop helps an agent search the web, look up data, send an email, or do any other task you expose. Because the output is structured, you get fewer mistakes than when the model tries to write raw code or natural-language commands.

Visit the following resources to learn more:

- [@article@A Comprehensive Guide to Function Calling in LLMs](https://thenewstack.io/a-comprehensive-guide-to-function-calling-in-llms/)
- [@article@Function Calling with LLMs | Prompt Engineering Guide](https://www.promptingguide.ai/applications/function_calling)
- [@article@Function Calling with Open-Source LLMs](https://medium.com/@rushing_andrei/function-calling-with-open-source-llms-594aa5b3a304)