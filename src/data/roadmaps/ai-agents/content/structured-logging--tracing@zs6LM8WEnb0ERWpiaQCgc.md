# Structured Logging & Tracing

Structured logging and tracing are ways to record what an AI agent does so you can find and fix problems fast. Instead of dumping plain text, the agent writes logs in a fixed key-value format, such as time, user_id, step, and message. Because every entry follows the same shape, search tools can filter, sort, and count events with ease. Tracing links those log lines into a chain that follows one request or task across many functions, threads, or microservices. By adding a unique trace ID to each step, you can see how long each part took and where errors happened. Together, structured logs and traces offer clear, machine-readable data that helps developers spot slow code paths, unusual behavior, and hidden bugs without endless manual scans.

Visit the following resources to learn more:

- [@article@Understanding Structured Logging: A Comprehensive Guide](https://www.graphapp.ai/blog/understanding-structured-logging-a-comprehensive-guide)
- [@article@Structured Logging & Cloud Logging](https://cloud.google.com/logging/docs/structured-logging)
- [@article@Best Practices for Logging in AI Applications](https://www.restack.io/p/best-ai-practices-software-compliance-answer-logging-best-practices-cat-ai)