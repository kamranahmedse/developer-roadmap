# Cloud config

Spring Cloud Config is a library for managing configuration properties for distributed applications. It allows developers to externalize configuration properties for an application, so that they can be easily changed without modifying the application's code. It also provides a centralized server for storing and managing configuration properties for multiple applications, making it easy to update and rollback configurations across different environments.

Spring Cloud Config Server is an HTTP server that provides a REST API for managing configuration properties. It can store configuration properties in a variety of back-ends such as a file system, a Git repository, or a database. The server also supports encryption and decryption of sensitive properties.

Spring Cloud Config Client is a library that can be included in an application, and it connects to the Config Server to retrieve the properties needed for the application to run. The client can also be configured to automatically refresh the properties when they change, so that the application can pick up the new values without having to be restarted.

By using Spring Cloud Config, developers can have a centralized and consistent approach for managing the configuration properties of their microservices or distributed applications, making it easy to modify the properties without having to change the code, also it helps in maintaining different environment configuration easily.

For more resources, visit the following links:

- [Spring Cloud Config](https://spring.io/projects/spring-cloud-config#:~:text=Spring%20Cloud%20Config%20provides%20server,for%20applications%20across%20all%20environments.)
- [Quick Intro to Spring Cloud Configuration](https://www.baeldung.com/spring-cloud-configuration)
- [Spring Boot - Cloud Configuration Server](https://www.tutorialspoint.com/spring_boot/spring_boot_cloud_configuration_server.htm)

