# Embedded server

Spring Embedded Server refers to the ability of Spring Boot applications to run an embedded web server, such as Tomcat, Jetty or Undertow, directly within the application, without the need to deploy it to a separate standalone web server. This makes it easy to develop and test web applications, as well as to deploy them in environments where a standalone web server may not be available or desirable.

When you include the spring-boot-starter-web dependency in your application, Spring Boot automatically configures and starts an embedded web server, such as Tomcat, to run your application. This means that you don't need to install and configure a separate web server, such as Apache Tomcat, to run your application.

Embedded servers are also lightweight and easy to start and stop, which makes it easier to test your application. You can start and stop the embedded server programmatically and run integration tests on your controllers, endpoints and other web components.

You can also configure the port and other options of the embedded server by specifying properties in the application.properties or application.yml file.

In summary, Spring Boot's Embedded Server feature is a convenient and powerful feature that allows you to run a web server directly within your application, without the need to deploy it to a separate standalone web server. This makes it easy to develop, test, and deploy web applications, and it's also lightweight, easy to start and stop, and easy to configure.

For more resources, visit the following links:

- [Embedded Servers in Spring](https://subscription.packtpub.com/book/application-development/9781789132588/3/ch03lvl1sec24/embedded-servers#:~:text=Spring%20Boot%20brings%20in%20the,is%20installed%20on%20the%20server.)
- [What is an Embedded Server? (Spring Boot)](https://www.springboottutorial.com/java-programmer-essentials-what-is-an-embedded-server)
- [Embedded Web Servers ‘How-to’ guides](https://docs.spring.io/spring-boot/docs/2.1.9.RELEASE/reference/html/howto-embedded-web-servers.html)