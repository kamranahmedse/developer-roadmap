# OpenAI Assistant API

The OpenAI Assistants API lets you add clear, task-specific actions to a chat with a large language model. You first describe each action you want the model to use, giving it a name, a short purpose, and a list of inputs in JSON form. During the chat, the model may decide that one of these actions will help. It then returns the name of the action and a JSON object with the input values it thinks are right. Your code receives this call, runs real work such as a database query or a web request, and sends the result back to the model. The model reads the result and continues the chat, now armed with fresh facts. This loop lets you keep control of what real work happens while still letting the model plan and talk in natural language.

Visit the following resources to learn more:

- [@official@OpenAI Documentation – Assistants API Overview](https://platform.openai.com/docs/assistants/overview)  
- [@official@OpenAI Blog – Introducing the Assistants API](https://openai.com/blog/assistants-api)  
- [@official@OpenAI Cookbook – Assistants API Example](https://github.com/openai/openai-cookbook/blob/main/examples/Assistants_API_overview_python.ipynb)  
- [@official@OpenAI API Reference – Assistants Endpoints](https://platform.openai.com/docs/api-reference/assistants)  
