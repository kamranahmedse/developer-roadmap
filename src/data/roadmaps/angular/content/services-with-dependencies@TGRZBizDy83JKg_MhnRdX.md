# Testing services with dependencies

When you add a dependency to your service, you must also include it in your tests. For isolated tests, pass an instance of the injectable dependency class into the service’s constructor. Using the `inject` function can add complexity. Injecting the real service is often impractical because dependent services can be difficult to create and control. Instead, mock the dependency, use a dummy value, or create a spy on the relevant service method. By using the TestBed testing utility, you can let Angular’s dependency injection handle service creation and manage constructor argument order.

Visit the following resources to learn more:

- [@official@Testing Services](https://angular.dev/guide/testing/services)
- [@article@Testing-Angular.com](https://testing-angular.com/testing-services/)
- [@video@Testing the Service which has another service injected through Dependency Injection](https://www.youtube.com/watch?v=ACb8wqwgOV4)
- [@video@Testing Services which has HttpClient as dependency by using Jasmine Spy](https://www.youtube.com/watch?v=15othucRXcI)
- [@video@Angular Unit Tests with the inject() function](https://www.youtube.com/watch?v=Tvsa4OMUGXs)
