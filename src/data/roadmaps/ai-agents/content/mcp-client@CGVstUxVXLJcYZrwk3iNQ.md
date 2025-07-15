# MCP Client

The MCP Client is the part of an AI agent that talks to the language model API. It collects messages, files, and tool signals, packs them using the Model Context Protocol, and sends them to the model. When a reply comes back, it unpacks it, checks the format, and passes the result to other modules. It also tracks token usage, filters private data, retries failed calls, and logs important events for debugging.

Visit the following resources to learn more:

- [@opensource@Model Context Protocol](https://github.com/modelcontextprotocol/modelcontextprotocol)
- [@official@Model Context Protocol](https://modelcontextprotocol.io/introduction)
- [@official@OpenAI API Reference](https://platform.openai.com/docs/api-reference)  
- [@official@Anthropic API Documentation](https://docs.anthropic.com/claude/reference)  
