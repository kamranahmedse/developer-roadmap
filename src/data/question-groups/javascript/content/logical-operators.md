There are four logical operators in JavaScript: `||` (OR), `&&` (AND), `!` (NOT), and `??` (Nullish Coalescing). They can be used with boolean values, or with non-boolean values.

## OR (||)

The OR operator (`||`) returns the first truthy value, or the last value if none are truthy.

```js
console.log('hello' || 0); // hello
console.log(false || 'hello'); // hello
console.log('hello' || 'world'); // hello
```

## AND (&&)

The AND operator (`&&`) aka logical conjunction returns the first falsy value, or the last value if none are falsy.

```js
console.log('hello' && 0); // 0
console.log(false && 'hello'); // false
console.log('hello' && 'world'); // world
```

## NOT (!)

It simply inverts the boolean value of its operand.

```js
console.log(!true); // false
console.log(!false); // true
console.log(!'hello'); // false
console.log(!0); // true
```

## Nullish Coalescing (??)

The Nullish Coalescing Operator (`??`) returns the right operand if the left one is `null` or `undefined`, otherwise, it returns the left operand. It's useful for setting default values without considering falsy values like `0` or `''` as absent.

```js
console.log(null ?? 'hello'); // hello
console.log(undefined ?? 'hello'); // hello
console.log('' ?? 'hello'); // ''
console.log(0 ?? 'hello'); // 0
```
