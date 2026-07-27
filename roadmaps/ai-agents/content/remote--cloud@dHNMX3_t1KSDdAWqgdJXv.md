# Remote / Cloud

Remote or cloud deployment places the MCP server on a cloud provider instead of a local machine. You package the server as a container or virtual machine, choose a service like AWS, Azure, or GCP, and give it compute, storage, and a public HTTPS address. A load balancer spreads traffic, while auto-scaling adds or removes copies of the server as demand changes. You secure the endpoint with TLS, API keys, and firewalls, and you send logs and metrics to the provider’s monitoring tools. This setup lets the server handle many users, updates are easier, and you avoid local hardware limits, though you must watch costs and protect sensitive data.

Visit the following resources to learn more:

- [@official@Edge AI vs. Cloud AI: Real-Time Intelligence Models](https://medium.com/@hassaanidrees7/edge-ai-vs-cloud-ai-real-time-intelligence-vs-centralized-processing-df8c6e94fd11)
- [@article@Cloud AI vs. On-premises AI](https://www.pluralsight.com/resources/blog/ai-and-data/ai-on-premises-vs-in-cloud)
- [@article@Cloud vs On-Premises AI Deployment](https://toxigon.com/cloud-vs-on-premises-ai-deployment)