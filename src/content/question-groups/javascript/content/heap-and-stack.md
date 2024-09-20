The Heap and Stack in JavaScript Engine are two different data structures that store data in different ways.

## Stack

The Stack is a small, organized region of memory. It is where primitive values, function calls, and local variables are stored. It follows a "Last In, First Out" (LIFO) order, meaning that the last item added to the stack is the first one to be removed. Each function invocation creates a new stack frame, which contains the function's local variables, return address, and other contextual data.

## Heap

The Heap is a large, mostly unstructured region of memory. It is where `objects`, `arrays`, and `functions` are stored. Variables from the Stack (e.g., in functions) point to locations in the Heap for these dynamically allocated structures.

When you declare a primitive type (like a number or boolean), it's usually managed in the stack. But when you create an object, array, or function, it's stored in the heap, and the stack will hold a reference to that location in the heap.

For example:

```js
const name = 'JavaScript'; // Stored on the stack
const roadmap = { name: 'JS' }; // `roadmap` reference on the stack, actual object { name: 'JS' } in the heap
```

In the code above, the primitive value `JavaScript` for variable `name` is directly stored on the stack. For the object assigned to `roadmap`, its actual data resides in the heap, and the reference to this data (a memory address pointer) is held on the stack.
