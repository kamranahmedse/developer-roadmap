# MCP Servers

An MCP Server is an application that exposes tools, data resources, and prompt templates to AI clients using the Model Context Protocol (MCP). Instead of writing custom API wrappers for every database, file system, or third-party service, developers can build or run MCP servers that adhere to the standard JSON-RPC interface. AI clients (hosts such as Claude Desktop, Cursor, or custom agent runtimes) connect to MCP servers over standard transport protocols (`stdio`, `SSE`), discover available capabilities dynamically, and securely invoke tools or query resources on demand.

Visit the following resources to learn more:

- [@official@Model Context Protocol Official Documentation](https://modelcontextprotocol.io/introduction)
- [@opensource@punkeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers)
- [@article@Introducing the Azure MCP Server ](https://devblogs.microsoft.com/azure-sdk/introducing-the-azure-mcp-server/)
- [@article@The Ultimate Guide to MCP](https://guangzhengli.com/blog/en/model-context-protocol)
- [@article@AWS MCP Servers for Code Assistants](https://aws.amazon.com/blogs/machine-learning/introducing-aws-mcp-servers-for-code-assistants-part-1/)