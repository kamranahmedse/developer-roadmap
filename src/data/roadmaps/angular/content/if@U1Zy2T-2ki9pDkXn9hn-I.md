# @if

The @if block conditionally displays its content when its condition expression is truthy. Content is added and removed from the DOM based on the evaluation of conditional expressions in the @if and @else blocks.

'''html
<div>
  @if (x > y) {
    <p>{{x}} is greater than {{y}}</p>
  } @else if (y > x) {
    <p>{{x}} is less than {{y}}</p>
  } @else {
    <p>{{x}} is equal to {{y}}</p>
  }
</div>
'''

Some things to be mindful of when using @if:

- If you forget to read a signal, the conditional will always be evaluated as truthy since signals cannot be null.
- Inside an @if conditional, using optional chaining on an object's property can cause TypeScript issues.

Visit the following resources to learn more:

- [@official@Angular Official Docs - @if](https://angular.dev/api/core/@if)
- [@video@Narrow Down signal value type within an if statement](https://egghead.io/lessons/angular-narrow-down-angular-s-signal-value-type-within-an-if-statement)
