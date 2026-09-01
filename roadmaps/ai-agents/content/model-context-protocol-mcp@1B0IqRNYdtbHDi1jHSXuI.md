# Model Context Protocol (MCP)

Model Context Protocol (MCP) is an open, standardized protocol that lets AI applications connect to external data sources and tools in a uniform way. Instead of writing a custom integration every time a model needs to read a file, query a database, or call an API, developers expose that capability through an MCP server, and any MCP-compatible client (the AI application) can discover and use it the same way. MCP follows a client-server architecture: the host application runs a client that talks to one or more servers over a defined protocol, exchanging structured requests for tools, resources, or prompts. This decouples AI applications from the specific systems they connect to, similar to how the Language Server Protocol decoupled code editors from language-specific tooling.

Visit the following resources to learn more:

- [@course@MCP: Build Rich-Context AI Apps with Anthropic](https://www.deeplearning.ai/short-courses/mcp-build-rich-context-ai-apps-with-anthropic/)
- [@official@Model Context Protocol](https://modelcontextprotocol.io/introduction)
- [@opensource@Model Context Protocol](https://github.com/modelcontextprotocol/modelcontextprotocol)
- [@article@Introducing the Azure MCP Server ](https://devblogs.microsoft.com/azure-sdk/introducing-the-azure-mcp-server/)
- [@article@The Ultimate Guide to MCP](https://guangzhengli.com/blog/en/model-context-protocol)