# Communication

Angular components can communicate with each other using `@Input()` and `@Output()` decorators. These decorators facilitate data exchange between parent and child components.

- **@Input()**: This decorator allows a parent component to pass data to a child component, enabling the child to receive and use the data.
- **@Output()**: This decorator allows a child component to emit events to a parent component, enabling the parent to respond to changes or actions within the child component.

Additionally, **model inputs** are a special type of input that enable two-way data binding. This means that changes in the child component can be propagated back to the parent component, ensuring synchronization between the two. Model inputs automatically create a corresponding output, typically named by appending “Change” to the input’s name, to facilitate this two-way communication.

To facilitate communication between unrelated components, it’s most effective to trigger events using `EventEmitter` and have the components listen for these events. This approach ensures a decoupled and flexible architecture, allowing components to interact seamlessly without direct dependencies.

Visit the following resources to learn more:

- [@official@Angular Official Website - Inputs](https://angular.dev/guide/components/inputs)
- [@official@Angular Official Website - Outputs](https://angular.dev/guide/components/outputs)
- [@official@Angular Official Docs - Model Inputs](https://angular.dev/guide/signals/model)
- [@official@Custom events with outputs](https://angular.dev/guide/components/outputs)
- [@video@Non-Related Component Communication | Angular Component & Directives](https://www.youtube.com/watch?v=aIkGXMJFTzM)