# Health Endpoint Monitoring
 
Health endpoint monitoring exposes a dedicated endpoint on a service that reports whether it is functioning correctly, often checking its own dependencies as part of the response. External systems, like load balancers or orchestration platforms, poll this endpoint to decide whether to route traffic to that instance. This gives an automated way to detect and react to unhealthy instances.

Visit the following resources to learn more:

- [@article@Health Endpoint Monitoring pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/health-endpoint-monitoring)
- [@article@Explaining the health endpoint monitoring pattern](https://www.oreilly.com/library/view/java-ee-8/9781788830621/5012c01e-90ca-4809-a210-d3736574f5b3.xhtml)