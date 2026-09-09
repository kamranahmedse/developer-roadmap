# Providers

Providers are objects that tell the Angular dependency injection system how to obtain a value or an instance of a dependency. When a component or service needs a specific dependency, the provider acts as a configuration that instructs the injector to create that instance, return an existing one, or use a specific factory function to generate it. These instructions are typically defined within the metadata of a component or module to determine the scope and availability of the associated services.

Visit the following resources to learn more:

- [@official@Defining dependency providers](https://angular.dev/guide/di/defining-dependency-providers)
- [@official@Component API](https://angular.dev/api/core/Component#providers)