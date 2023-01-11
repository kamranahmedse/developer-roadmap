# Jwt authentication

JSON Web Token (JWT) is a JSON-based open standard for creating access tokens that assert some number of claims. These claims can be verified and trusted because they are digitally signed. JWT is typically used to protect API endpoints, and it enables the transmission of information that can be verified and trusted, because it is digitally signed.

In a Spring application, you can use the Spring Security library to add JWT authentication and authorization to your API. The library provides a JWT-based authentication filter that you can add to your API endpoints. The filter will check the JWT that is included in the request header, and if it is valid, it will set the authentication information in the security context. You can then use the security context to perform authorization checks on the API endpoints.

To use JWT in Spring, you'll need to first configure Spring Security to use JWT. You'll need to add the Spring Security and JJWT (Java JWT) dependencies to your project, and then configure the JWT filter and the authentication manager.

Once the configuration is done, you will need to add the filter in your Security Configuration class with httpSecurity.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

You will also need to create a service to create and validate JWT tokens, and then use it in your authentication controller. There are various library available for this like JWT Java library, Spring Security JWT.

For more resources, visit the following links:

- [JWT Token Authentication in Spring](https://springframework.guru/jwt-authentication-in-spring-microservices-jwt-token/#:~:text=Spring%20Boot%20Microservices%20requires%20authentication,securely%20transmitting%20information%20between%20parties.)
- [Spring Security with JWT for REST API](https://www.toptal.com/spring/spring-security-tutorial)
- [Spring Security - JWT](https://www.tutorialspoint.com/spring_security/spring_security_with_jwt.htm)


