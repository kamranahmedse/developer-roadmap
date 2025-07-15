# MCP Hosts

MCP Hosts are computers or services that run the Model Context Protocol. They handle incoming calls, load the MCP manifest, check requests, and pass data between users, tools, and language models. Hosts may cache recent messages, track token usage, and add safety or billing checks before sending prompts to the model. They expose an API endpoint so apps can connect easily. You can run a host on your laptop for testing or deploy it on cloud platforms for scale. The host acts as the trusted bridge where agents, tools, and data meet.

Visit the following resources to learn more:

- [@official@Vercel Serverless Hosting](https://vercel.com/docs)  
- [@article@The Ultimate Guide to MCP](https://guangzhengli.com/blog/en/model-context-protocol)
- [@article@AWS MCP Servers for Code Assistants](https://aws.amazon.com/blogs/machine-learning/introducing-aws-mcp-servers-for-code-assistants-part-1/)
- [@opensource@punkeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers)