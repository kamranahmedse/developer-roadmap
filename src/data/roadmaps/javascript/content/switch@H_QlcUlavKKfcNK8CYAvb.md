# Switch Case

The `switch` statement evaluates an expression, matching the expression's value against a series of `case` clauses, and executes statements after the first `case` clause with a matching value, until a `break` statement is encountered. The `default` clause of a `switch` statement will be jumped to if no `case` matches the expression's value.

## Example

```js
switch (expression) {
  case value1:
    //Statements executed when the result of expression matches value1
    break;
  case value2:
    //Statements executed when the result of expression matches value2
    break;
  ...
  case valueN:
    //Statements executed when the result of expression matches valueN
    break;
  default:
    //Statements executed when none of the values match the value of the expression
    break;
}
```

Visit the following resources to learn more:

- [@article@switch - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
- [@article@The `switch` Statement: Why, What and How - CodeGuage](https://www.codeguage.com/courses/js/conditions-switch)
- [@article@The switch statement - javascript.info](https://javascript.info/switch)
