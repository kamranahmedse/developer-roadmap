# Monitoring

Distributed systems are hard to build, deploy and maintain. They consist of multiple components which communicate with each other. In parallel to that, users use the system, resulting in multiple requests. Making sense of this noise is important to understand:
- how the system behaves
- is it broken
- is it fast enough
- what can be improved

A product can integrate with existing monitoring products (APM - application performance management). They can show a detailed view of each request - its user, time, components involved, state(error or OK) etc. 

We can build dashboards with custom events or metrics according to our needs. Automatic alert rules can be configured on top of these events/metrics.

A few popular tools are Grafana, Sentry, Mixpanel, NewRelic etc

- [@article@Observability vs Monitoring?](https://www.dynatrace.com/news/blog/observability-vs-monitoring/)
- [@article@What is APM?](https://www.sumologic.com/blog/the-role-of-apm-and-distributed-tracing-in-observability/)
- [@article@Top monitoring tools 2024](https://thectoclub.com/tools/best-application-monitoring-software/)
- [@article@Caching strategies](https://medium.com/@genchilu/cache-strategy-in-backend-d0baaacd2d79)
