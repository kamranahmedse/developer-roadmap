# Spring Webflux

Spring Webflux is a reactive web framework of Spring to create web services using reactive libraries. Under the hood, it uses Project Reactor. Project Reactor is an implementation of the Reactive Streams specification that provides a functional API for composing Reactive Streams. And also it serves as the foundation of Spring’s support for reactive programming. 

The reactor is the default Reactive Streams implementation supported in Spring WebFlux. Typical servlet web frameworks, such as Spring MVC, are blocking and multithreaded in nature, using a single thread per connection. Asynchronous web frameworks (Spring WebFlux) apply event looping to handle more requests with fewer threads. Though Spring MVC and Spring WebFlux share the same annotations, Spring WebFlux is, in many ways, indistinguishable from Spring MVC.

The Reactive Streams specification defines four types: `Publisher`, `Subscriber`, `Subscription`, and `Transformer` (which is a combination of Publisher and Subscriber). Project Reactor implements Reactive Streams and abstracts stream definitions into two primary types, `Flux` and `Mono`, each of which offers several hundred operations.

Visit the following resources to learn more:

- [Web on Reactive Stack](https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html)
- [Guide to Spring 5 WebFlux](https://www.baeldung.com/spring-webflux)
- [Spring WebFlux By Example](https://hantsy.github.io/spring-reactive-sample)