# @if

The @if block conditionally displays its content when its condition expression is truthy.  Content is added and removed from the DOM based on the evaluation of conditional expressions in the @if and @else blocks.

```
const count = signal(0);

@if(count){
    return true;
}
```

Remember to read a signal inside a conditional because a signal will always be evaluated as truthy since signals cannot be null.

```
const count = signal(0);

@if(count() === 1){
    return false;
}
```

Another issue that can occur with signals and @if is type-narrowing problems.  

Visit the following resources to learn more:

- [@official@Angular Official Docs - @if](https://angular.dev/api/core/@if)
- [@video@Narrow Down signal value type within an if statement](https://egghead.io/lessons/angular-narrow-down-angular-s-signal-value-type-within-an-if-statement)
