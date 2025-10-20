# Connect to Remote Server

Remote or cloud deployment places the MCP server on a cloud provider instead of a local machine. You package the server as a container or virtual machine, choose a service like AWS, Azure, or GCP, and give it compute, storage, and a public HTTPS address. A load balancer spreads traffic, while auto-scaling adds or removes copies of the server as demand changes. You secure the endpoint with TLS, API keys, and firewalls, and you send logs and metrics to the provider’s monitoring tools. This setup lets the server handle many users, updates are easier, and you avoid local hardware limits, though you must watch costs and protect sensitive data.

Visit the following resources to learn more:

- [@official@Connect to remote MCP Servers](https://modelcontextprotocol.io/docs/develop/connect-remote-servers)
- [@article@Remote MCP Servers](https://mcpservers.org/remote-mcp-servers)
- [@video@Deploy Remote MCP Servers in Python (Step by Step)](https://www.youtube.com/watch?v=wXAqv8uvY0M)