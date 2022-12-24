# Observability

In sofware development, observability is the measure of how well we can understand a system from the work it does, and how to make it better.

So what makes a system to be "observable"? It is its ability of producing and collecting metrics, logs and traces in order for us to understand what happens under the hood and identify issues and bottlenecks faster.

An open-source Observability framework called OpenTelemetry lays out the requirements for producing, gathering, and exporting telemetry data, including logs, metrics, and traces. It also describes how metrics, traces, and logs are related to one another. Additionally, it offers free and open-source APIs, libraries, and agents for gathering distributed traces and metrics for monitoring applications.

You can of course implement all those features by yourself, but there are a lot of softwares out there that can help you with it like Datadog, Sentry and CloudWatch.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='blue' badgeText='Official Documentation' href='https://opentelemetry.io/docs/'>OpenTelemetry Docs</BadgeLink>
<BadgeLink colorScheme='blue' badgeText='Official Documentation' href='https://docs.datadoghq.com/'>DataDog Docs</BadgeLink>
<BadgeLink colorScheme='blue' badgeText='Official Documentation' href='https://aws.amazon.com/cloudwatch/getting-started/'>AWS CloudWatch Docs</BadgeLink>
<BadgeLink colorScheme='blue' badgeText='Official Documentation' href='https://docs.sentry.io/'>Sentry Docs</BadgeLink>
<BadgeLink badgeText='Watch' href='https://www.youtube.com/watch?v=Wx0SHRb2xcI'>AWS re:Invent 2017: Improving Microservice and Serverless Observability with Monitor</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://newrelic.com/blog/best-practices/observability-instrumentation'>Observability and Instrumentation: What They Are and Why They Matter</BadgeLink>