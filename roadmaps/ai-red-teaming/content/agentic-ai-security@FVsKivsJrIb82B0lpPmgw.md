# Agentic AI Security

As AI agents capable of autonomous action become more common, AI Red Teamers must test their unique security implications. This involves assessing risks related to goal hijacking, unintended actions through tool use, exploitation of planning mechanisms, and ensuring agents operate safely within their designated boundaries. A growing share of real-world incidents target the tool-connection layer rather than the model itself — confused-deputy attacks where a tool server forwards a caller's credentials to a downstream service it was never issued for, or a malicious instruction hidden in untrusted content (e.g. a GitHub issue) tricking an agent into exfiltrating data through a fully trusted tool. Testing an agentic system means testing its tool boundaries and cross-server trust as rigorously as its prompts.

Visit the following resources to learn more:

- [@article@AI Agents - Learn Prompting](https://learnprompting.org/docs/intermediate/ai_agents)
- [@article@EmbraceTheRed](https://embracethered.com/)
- [@official@Model Context Protocol - Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [@article@GitHub MCP Exploited: Accessing Private Repositories via MCP - Invariant Labs](https://invariantlabs.ai/blog/mcp-github-vulnerability)