# Object.is
 
`Object.is()` is a method for comparing two values with stricter behavior than `===`. It handles two edge cases differently: `Object.is(NaN, NaN)` returns `true` (while `NaN === NaN` is `false`), and `Object.is(+0, -0)` returns `false` (while `+0 === -0` is `true`). It is useful when exact value identity is needed.

Visit the following resources to learn more:

- [@article@Object.is() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)