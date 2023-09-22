The `==` equality operator converts the operands if they are not of the same type, then applies strict comparison. The `===` strict equality operator only considers values equal that have the same type.

```js
console.log(1 == '1'); // true
console.log(1 === '1'); // false
console.log(1 === 1); // true
```
