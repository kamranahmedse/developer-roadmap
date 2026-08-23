# Creating MCP Servers

An MCP server exposes data, tools, and prompts to AI client applications using the Model Context Protocol (MCP) based on the JSON-RPC 2.0 standard. To build an MCP server, choose a language SDK (such as Python `@modelcontextprotocol/sdk` or TypeScript `@modelcontextprotocol/sdk`) and a transport layer like standard I/O (`stdio`) for local desktop tools or Server-Sent Events (`SSE`) / Streamable HTTP for remote network services. Implement core MCP primitives: Tools (executable functions the model can call), Resources (structured data and file-like context attachments), and Prompts (reusable prompt templates). Add input schema validation using libraries like Pydantic or Zod, implement proper error handling, and test your server locally using the MCP Inspector.

Visit the following resources to learn more:

- [@official@Model Context Protocol Official Documentation](https://modelcontextprotocol.io/introduction)
- [@official@MCP Quickstart: Build a Server](https://modelcontextprotocol.io/quickstart/server)
- [@official@Model Context Protocol Specification](https://spec.modelcontextprotocol.io/)
- [@article@How to Build and Host Your Own MCP Servers in Easy Steps?](https://collabnix.com/how-to-build-and-host-your-own-mcp-servers-in-easy-steps/)