# Async await

We all know that JavaScript is Synchronous in nature which means that it has an event loop that allows you to queue up an action that won’t take place until the loop is available sometime after the code that queued the action has finished executing.

But there’s a lot of functionalities in our program which makes our code Asynchronous and one of them is the Async/Await functionality. Async/Await is the extension of promises which we get as a support in the language. 

Async: It simply allows us to write promises based code as if it was synchronous and it checks that we are not breaking the execution thread. It operates asynchronously via the event-loop. Async functions will always return a value. It makes sure that a promise is returned and if it is not returned then JavaScript automatically wraps it in a promise which is resolved with its value.

Await: Await function is used to wait for the promise. It could be used within the async block only. It makes the code wait until the promise returns a result. It only makes the async block wait.

Supported Browsers: The browsers supported by Async/Await Function are listed below:
 - Google Chrome 55 and above
 - Firefox 52 and above
 - Apple Safari 10.1 and above
 - Opera 42 and above
 - Edge 14 and above

<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.geeksforgeeks.org/async-await-function-in-javascript/'>Async Await Javascript</BadgeLink>
