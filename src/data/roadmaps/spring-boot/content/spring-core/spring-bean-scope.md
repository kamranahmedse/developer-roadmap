# Spring Bean Scope

In the Spring Framework, a bean is an object that is instantiated, assembled, and managed by the Spring IoC container. One of the key features of the Spring container is its ability to manage the lifecycle of beans, which includes creating, configuring, and destroying beans as necessary. One way the container can control the lifecycle of a bean is by specifying its scope.

The scope of a bean determines the lifecycle and visibility of the bean within the container and to other objects in the application. Spring provides several different bean scopes, including:

- **singleton**: This is the default scope for a bean. A singleton bean is instantiated only once by the container and shared by all objects that request it.
- **prototype**: This scope means that the container creates a new instance of the bean every time a request is made for it.
- **request**: This scope is only applicable to web applications and means that the container creates a new instance of the bean for each HTTP request.
- **session**: Similar to the request scope, but the instance of the bean is created for each HTTP session,
- **application**: This scope is for global application-level data, and only valid in a web-aware Spring ApplicationContext.
- **websocket**: This scope is for global WebSocket-level data, and also only valid in a web-aware Spring ApplicationContext.

The scope of a bean can be specified in the configuration file using the scope attribute of the bean element.

It is very important to choose the right scope for a bean, as it can affect the behavior and performance of the application.

Visit the following links for more resources:

- [@article@Spring - Bean Scopes](https://www.tutorialspoint.com/spring/spring_bean_scopes.htm)
- [@article@Quick Guide to Spring Bean Scopes](https://www.baeldung.com/spring-bean-scopes)
- [@article@Spring Bean Scopes](https://www.digitalocean.com/community/tutorials/spring-bean-scopes)
- [@feed@Explore top posts about Spring Framework](https://app.daily.dev/tags/spring?ref=roadmapsh)
