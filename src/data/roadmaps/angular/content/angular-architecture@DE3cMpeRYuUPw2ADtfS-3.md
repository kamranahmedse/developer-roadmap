# Angular Architecture (by copilot)

breakdown of Angular’s architecture:

## 1. Modules
*NgModules*: Angular apps are modular and use NgModules to organize an application into cohesive blocks of functionality. Each Angular app has at least one root module, typically named AppModule.
## 2. Components
Components*: The basic building blocks of an Angular application. Each component consists of an HTML template, a CSS stylesheet, and a TypeScript class that defines the component’s behavior.
## 3. Templates
*Templates*: Define the view for a component. They combine HTML with Angular directives and binding markup to dynamically update the view based on application data.
## 4. Metadata
*Metadata*: Used to decorate a class so that Angular knows how to process it. For example, the @Component decorator identifies a class as an Angular component and provides the template and related metadata.
## 5. Data Binding
*Data Binding*: Connects the application data to the DOM. There are two types of data binding:
*Event Binding*: Allows the application to respond to user input.
*Property Binding*: Updates the DOM when the application data changes.
## 6. Directives
*Directives*: Special markers in the DOM that tell Angular to do something with a DOM element (e.g., show/hide an element, repeat a list of elements).
## 7. Services
*Services*: Classes that provide specific functionality, such as fetching data from a server. Services can be injected into components or other services using Angular’s dependency injection system.
## 8. Dependency Injection
*Dependency Injection (DI)*: A design pattern used to implement IoC (Inversion of Control). It allows a class to receive its dependencies from an external source rather than creating them itself.

Visit the following resources to learn more:
- [@official@Angular architecture](https://v17.angular.io/guide/architecture)
