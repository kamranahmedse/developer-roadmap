A closure is a function that has access to its outer function scope even after the outer function has returned. This means a closure can remember and access variables and arguments of its outer function even after the function has finished.

```js
function outer() {
  const name = 'Roadmap';

  function inner() {
    console.log(name);
  }

  return inner;
}

const closure = outer();
closure(); // Roadmap
```

In the above example, the `inner` function has access to the `name` variable of the `outer` function even after the `outer` function has returned. Therefore, the `inner` function forms a closure.
