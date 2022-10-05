# Arguments object

`Arguments object` (like an `Array`) are local variable accessible in all  functions except arrow functions. The arguments object contains an entry for each argument passed to that function.

## Example
```js
function add(){
    if( arguments.length==0 ) return { message: "zero arguments" }

    // `arguments` object is not pure `Array`(Array-like). So, convert it to array and stored in `args`
    const args = Array.from(arguments);
    let sum = args.reduce((prev, current) => prev + current, 0);
    return { arguments, sum };
}

add(1,2,3); // { 
//    arguments: [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ], 
//    sum: 6 
// }
```

<ResourceGroupTitle>Free Content</ResourceGroupTitle>

<BadgeLink colorScheme="yellow" badgeText="Read More" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments">The arguments object - MDN Docs</BadgeLink>
<BadgeLink colorScheme="yellow" badgeText="Read" href="[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments](https://medium.com/javascript-dots/arguments-objects-in-javascript-e060df501610)">Arguments Objects in JavaScript - medium.com</BadgeLink>
