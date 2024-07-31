# fetch

fetch is a browser-compatible Node.js implementation of the `fetch` function found in browsers. The Fetch API has historically been widely used for performing client-side HTTP requests. Node.js v18 introduced `fetch` as an experimental global function, making it available without downloading any additional packages. The implementation is stable as of Node.js v21. 

Fetching data from an API with `fetch` in Node is the same as in native JavaScript.

## Syntax

```node
fetch(url, [options])
```

### Example  

```node
fetch('https://example.com/').then(res => console.log(res));
```

Fetch is Promise-based, meaning it returns a Promise object. Promises is a modern way of performing asynchronous network operations and avoiding "*callback hell*". 

Visit the following resources to learn more:

- [@official@MDN - Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [@official@NodeJS globals: fetch](https://nodejs.org/api/globals.html#fetch)
- [@official@MDN - Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [@article@freeCodeCamp on avoiding callback hell](https://www.freecodecamp.org/news/how-to-deal-with-nested-callbacks-and-avoid-callback-hell-1bc8dc4a2012/)
