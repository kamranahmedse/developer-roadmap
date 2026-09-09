# Parent-Child Interaction

Parent-child interaction refers to the mechanism of data flow between a parent component and its nested child component. A parent component passes data down to a child using the `@Input()` decorator, which allows the child to receive and display dynamic information. Conversely, a child component sends information back to its parent by using an `EventEmitter` and the `@Output()` decorator to trigger events that the parent can listen for and respond to.

Visit the following resources to learn more:

- [@official@Component Interaction](https://angular.io/guide/component-interaction)
- [@article@Medium - Parent-Child Communication](https://jaspritk.medium.com/parent-child-communication-in-angular-888373e0b69e)