# Model Context Protocol (MCP)

Model Context Protocol (MCP) is a rulebook that tells an AI agent how to pack background information before it sends a prompt to a language model. It lists what pieces go into the prompt—things like the system role, the user’s request, past memory, tool calls, or code snippets—and fixes their order. Clear tags mark each piece, so both humans and machines can see where one part ends and the next begins. Keeping the format steady cuts confusion, lets different tools work together, and makes it easier to test or swap models later. When agents follow MCP, the model gets a clean, complete prompt and can give better answers.

Visit the following resources to learn more:

- [@opensource@Model Context Protocol](https://github.com/modelcontextprotocol/modelcontextprotocol)
- [@official@Model Context Protocol](https://modelcontextprotocol.io/introduction)
- [@article@Introducing the Azure MCP Server ](https://devblogs.microsoft.com/azure-sdk/introducing-the-azure-mcp-server/)  
- [@article@The Ultimate Guide to MCP](https://guangzhengli.com/blog/en/model-context-protocol)