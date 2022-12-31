# Observability

In sofware development, observability is the measure of how well we can understand a system from the work it does, and how to make it better.

So what makes a system to be "observable"? It is its ability of producing and collecting metrics, logs and traces in order for us to understand what happens under the hood and identify issues and bottlenecks faster.

You can of course implement all those features by yourself, but there are a lot of softwares out there that can help you with it like Datadog, Sentry and CloudWatch.

{% resources %}
  {% Official "https://docs.datadoghq.com/", "DataDog Docs" %}
  {% Official "https://aws.amazon.com/cloudwatch/getting-started/", "AWS CloudWatch Docs" %}
  {% Official "https://docs.sentry.io/", "Sentry Docs" %}
  {% Blog "https://www.youtube.com/watch?v=Wx0SHRb2xcI", "AWS re:Invent 2017: Improving Microservice and Serverless Observability with Monitor" %}
  {% Blog "https://newrelic.com/blog/best-practices/observability-instrumentation", "Observability and Instrumentation: What They Are and Why They Matter" %}
{% endresources %}