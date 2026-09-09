# Pipes Precedence

Pipes precedence refers to the specific order in which multiple pipes are executed when chained together in a template expression. When you apply several pipes to a single data value, Angular processes them from left to right, passing the output of the first pipe as the input to the next. This sequence ensures that transformations are applied in a predictable, linear flow until the final result is ready for display.

Visit the following resources to learn more:

- [@official@Pipe operator precedence](https://angular.dev/guide/templates/pipes#pipe-operator-precedence)
- [@article@What is the precedence between pipe and ternary operators?](https://iq.js.org/questions/angular/what-is-the-precedence-between-pipe-and-ternary-operators)