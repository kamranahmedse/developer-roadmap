# process.nextTick()

Every time the event loop takes a full trip, we call it a tick. When we pass a function to `process.nextTick()`, we instruct the engine to invoke this function at the end of the current operation before the next event loop tick starts.

- [Understanding Process.NextTick()](https://nodejs.dev/en/learn/understanding-processnexttick/)
- [The Node.js process.nextTick()](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [The process.nextTick Function](https://www.youtube.com/watch?v=-niA5XOlCWI)
