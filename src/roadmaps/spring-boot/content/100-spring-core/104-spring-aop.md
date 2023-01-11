# Spring aop

Spring AOP (Aspect-Oriented Programming) is a feature of the Spring Framework that allows developers to define certain behaviors (i.e., "aspects") that cut across multiple classes, such as logging or transaction management. These behaviors, which are called "advices," can be applied to specific "join points" (i.e., points in the execution of a program) in the application, using "pointcuts" to determine where the advices should be applied.

Spring AOP allows developers to separate the implementation of these cross-cutting concerns from the business logic of the application, making the code more modular and easier to understand. This can also make the application more flexible, since the same advices can be applied to different parts of the code without having to duplicate the code for the advices themselves.

It uses AspectJ for pointcuts, advices and weaving . Spring AOP can be use for both proxy-based AOP and AspectJ based AOP. Proxies are generated at runtime while aspectJ weaving is done at compile time.

There are 3 types of advices:

1. Before advice: Run before the method execution
2. After returning advice: Run after the method execution, if method completes successfully
3. After throwing advice: Run after the method execution, if method exits by throwing an exception.
To use AOP in spring application you will have to add the spring-aop module to your application and configure it using XML or Java Configuration.


For more resources, visit the following links:

- [Spring AOP Tutorial](https://www.simplilearn.com/tutorials/spring-tutorial/spring-aop-aspect-oriented-programming#:~:text=Aspect%2DOriented%20Programming%20(AOP),into%20separate%20parts%20called%20concerns.)
- [AOP with Spring Framework](https://www.tutorialspoint.com/spring/aop_with_spring.htm)
- [Spring AOP Tutorial](https://howtodoinjava.com/spring-aop-tutorial/)



