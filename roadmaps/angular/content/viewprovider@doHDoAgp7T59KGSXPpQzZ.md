# viewProviders

viewProviders is a configuration property used within a component's decorator to define a set of injectable dependencies that are available only to that component and its child components. When services are declared here, they are restricted to the component's shadow DOM and any components nested within its template, effectively scoping the dependency injection container. This allows for the creation of encapsulated services that are hidden from the parent component and other parts of the application outside of that specific component tree.

Visit the following resources to learn more:

- [@official@Using the viewProviders array](https://angular.dev/guide/di/hierarchical-dependency-injection#using-the-viewproviders-array)
- [@official@Component - API](https://angular.dev/api/core/Component#viewProviders)