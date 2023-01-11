# Eureka

Spring Cloud Eureka is a library for service discovery in a microservices-based architecture. Service discovery is a technique that allows services to find and communicate with each other, without having to hardcode their addresses.

Eureka is a service registry that allows service instances to register themselves and to discover other services by name. It provides a simple, consistent way for services to find and communicate with each other, and it integrates with other Spring Cloud libraries such as Ribbon and Feign to provide load balancing and declarative REST clients.

When a service starts up, it registers itself with the Eureka server, and the server keeps track of all the services and their instances, along with their health status and other metadata.

When another service needs to communicate with a service, it looks up the Eureka server to find the instances of the service it needs, it can also use this information to do load balancing. The client-side load balancer will use this information to route requests to available instances of the service.

By using Spring Cloud Eureka, developers can build their microservices-based applications with self-discovery and self-registration capabilities, making it easier to scale and manage those applications, also provides a simple and consistent way to implement service discovery and registration, allowing microservices to easily find and communicate with each other.

For more resources, visit the following links:

- [Introduction to Spring Cloud Netflix – Eureka](https://www.baeldung.com/spring-cloud-netflix-eureka#:~:text=a%20service%20registry%20(Eureka%20Server,Spring%20Cloud%20Netflix%20Feign%20Client))
- [Spring Boot - Eureka Server](https://www.tutorialspoint.com/spring_boot/spring_boot_eureka_server.htm)
- [Introducing Spring Cloud EUREKA](https://www.youtube.com/watch?v=1uNo1NrqsX4)

