# openllmetry

openllmetry is a small Python library that makes it easy to watch what your AI agent is doing and how well it is working. It wraps calls to large-language-model APIs, vector stores, and other tools, then sends logs, traces, and simple metrics to any backend that speaks the OpenTelemetry standard, such as Jaeger, Zipkin, or Grafana. You add one or two lines of code at start-up, and the library captures prompt text, model name, latency, token counts, and costs each time the agent asks the model for an answer. The data helps you spot slow steps, high spend, or bad answers, and it lets you play back full traces to debug agent chains. Because it follows OpenTelemetry, you can mix these AI traces with normal service traces and see the whole flow in one place.

Visit the following resources to learn more:

- [@official@OpenTelemetry Documentation](https://www.traceloop.com/blog/openllmetry)  
- [@official@What is OpenLLMetry? - traceloop](https://www.traceloop.com/docs/openllmetry/introduction)  
- [@official@Use Traceloop with Python](https://www.traceloop.com/docs/openllmetry/getting-started-python)
- [@opensource@traceloop/openllmetry](https://github.com/traceloop/openllmetry)