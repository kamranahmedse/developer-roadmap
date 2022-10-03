# Async await

An async function is a function **declared with the async keyword**, and the await keyword is permitted within it. The async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains.

## Async: 
* Indicates function will always **return a promise** instead of returning a result.

## Await: 
* Wait for a promise to resolve or reject. 
* It **works only inside the async function**. 
* If await is used in a non-async function, there would be a **syntax error**.
* Await can be used with with any function which **returns a promise**.

### Use cases:
In many cases of fetching data from the back-end database and then rendering it in the front-end, async/await can be used as the rendering function waits till the promise of the data fetching function from the back-end is resolved.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.w3docs.com/learn-javascript/async-await.html'>W3Docs Async/Await</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.geeksforgeeks.org/difference-between-promise-and-async-await-in-node-js/'>Difference between Promise and Async/Await</BadgeLink>
