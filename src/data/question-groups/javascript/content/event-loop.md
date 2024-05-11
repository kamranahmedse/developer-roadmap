The Event loop has two main components: the Call stack and the Callback queue.

## Call Stack

The Call stack is a data structure that stores the tasks that need to be executed. It is a LIFO (Last In, First Out) data structure, which means that the last task that was added to the Call stack will be the first one to be executed.

## Callback Queue

The Callback queue is a data structure that stores the tasks that have been completed and are ready to be executed. It is a FIFO (First In, First Out) data structure, which means that the first task that was added to the Callback queue will be the first one to be executed.

## Event Loop's Workflow:

1. Executes tasks from the Call Stack.
2. For an asynchronous task, such as a timer, it runs in the background. JavaScript proceeds to the next task without waiting.
3. When the asynchronous task concludes, its callback function is added to the Callback Queue.
4. If the Call Stack is empty and there are tasks in the Callback Queue, the Event Loop transfers the first task from the Queue to the Call Stack for execution.

```js
setTimeout(() => console.log('Hello from the timer'), 0);
console.log('Hello from the main code');
```

1. `setTimeout` is processed, and because it's asynchronous, its callback is placed in the Callback Queue.
2. The next line, `console.log("Hello from the main code")`, is logged immediately.
3. Although the timer duration is 0 milliseconds, its callback has to wait until the Call Stack is empty. After the main code logs, the callback is moved from the Callback Queue to the Call Stack and executed.
4. The result is "Hello from the main code" being logged before "Hello from the timer".
